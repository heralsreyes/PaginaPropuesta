import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { validateProposalData } from "@/lib/proposalValidation";

function sanitizeSlug(rawSlug: string): string {
  return rawSlug
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET: Lista todas las propuestas disponibles o retorna una específica si se envía ?slug=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const proposalsDir = path.join(process.cwd(), "public", "proposals");

    if (slug) {
      const cleanSlug = sanitizeSlug(slug);
      const candidates = [
        path.join(proposalsDir, `${cleanSlug}.json`),
        path.join(proposalsDir, `${slug.trim().toLowerCase()}.json`),
        path.join(proposalsDir, `${slug.trim()}.json`),
      ];

      for (const filePath of candidates) {
        try {
          const fileContent = await fs.readFile(filePath, "utf-8");
          const parsed = JSON.parse(fileContent);
          return NextResponse.json({ success: true, data: parsed, slug: cleanSlug });
        } catch {
          // Continuar con el siguiente candidato
        }
      }

      return NextResponse.json(
        { success: false, error: `No se encontró la propuesta '${cleanSlug}'` },
        { status: 404 }
      );
    }

    // List all available proposals
    try {
      const files = await fs.readdir(proposalsDir);
      const jsonFiles = files.filter((f) => f.endsWith(".json"));

      const list = await Promise.all(
        jsonFiles.map(async (filename) => {
          const fileSlug = filename.replace(/\.json$/, "");
          try {
            const stat = await fs.stat(path.join(proposalsDir, filename));
            const content = await fs.readFile(path.join(proposalsDir, filename), "utf-8");
            const parsed = JSON.parse(content);
            return {
              slug: fileSlug,
              filename,
              clientName: parsed.client?.name || parsed.client?.shortName || fileSlug,
              projectTitle: parsed.project?.title || "",
              updatedAt: stat.mtime.toISOString(),
              sizeBytes: stat.size,
            };
          } catch {
            return {
              slug: fileSlug,
              filename,
              clientName: fileSlug,
              projectTitle: "",
              updatedAt: new Date().toISOString(),
              sizeBytes: 0,
            };
          }
        })
      );

      return NextResponse.json({ success: true, proposals: list });
    } catch (dirErr: any) {
      return NextResponse.json({ success: true, proposals: [] });
    }
  } catch (error: any) {
    console.error("[API /api/proposals GET Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error al obtener propuestas" },
      { status: 500 }
    );
  }
}

// POST: Guarda o actualiza una propuesta en public/proposals/[slug].json
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, proposal, theme, sections, canvasElements, buttonActionsMap, colors, editableFields, editableColors } = body;

    if (!proposal) {
      return NextResponse.json(
        { success: false, error: "El objeto 'proposal' es requerido" },
        { status: 400 }
      );
    }

    // Validar esquema básico de la propuesta
    const validation = validateProposalData(proposal);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: `Estructura inválida: ${validation.error}` },
        { status: 400 }
      );
    }

    // Generar slug limpio
    const rawTarget =
      slug ||
      proposal.client?.shortName ||
      proposal.client?.name ||
      proposal.project?.code ||
      "propuesta";
    let cleanSlug = sanitizeSlug(rawTarget);
    if (!cleanSlug) cleanSlug = "propuesta-personalizada";

    // Preparar objeto extendido consolidado
    const fullPayload = {
      ...proposal,
      ...(theme ? { theme } : {}),
      ...(colors ? { colors } : {}),
      ...(sections ? { sections } : {}),
      ...(canvasElements ? { canvasElements } : {}),
      ...(buttonActionsMap ? { buttonActionsMap } : {}),
      ...(editableFields ? { editableFields } : {}),
      ...(editableColors ? { editableColors } : {}),
      _savedAt: new Date().toISOString(),
    };

    const proposalsDir = path.join(process.cwd(), "public", "proposals");
    const targetFile = `${cleanSlug}.json`;
    const targetPath = path.join(proposalsDir, targetFile);

    let savedMode = "filesystem";

    try {
      await fs.mkdir(proposalsDir, { recursive: true });
      await fs.writeFile(targetPath, JSON.stringify(fullPayload, null, 2), "utf-8");
    } catch (fsErr: any) {
      console.warn("[API /api/proposals POST] No se pudo escribir en disco (entorno de solo lectura):", fsErr.message);
      savedMode = "readonly-fallback";
    }

    // Si se tiene configurado un token de GitHub para Vercel, se puede hacer commit directo al repo
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
      try {
        const repo = process.env.GITHUB_REPO;
        const branch = process.env.GITHUB_BRANCH || "main";
        const ghPath = `public/proposals/${targetFile}`;
        const ghUrl = `https://api.github.com/repos/${repo}/contents/${ghPath}`;

        let sha: string | undefined;
        const checkRes = await fetch(`${ghUrl}?ref=${branch}`, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        });
        if (checkRes.ok) {
          const checkData = await checkRes.json();
          sha = checkData.sha;
        }

        const commitRes = await fetch(ghUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `chore(proposal): actualizar ${targetFile} desde el editor`,
            content: Buffer.from(JSON.stringify(fullPayload, null, 2)).toString("base64"),
            branch,
            ...(sha ? { sha } : {}),
          }),
        });

        if (commitRes.ok) {
          savedMode = "github-commit";
        }
      } catch (ghErr: any) {
        console.warn("[API /api/proposals] Error al sincronizar con GitHub:", ghErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Propuesta guardada correctamente en ${targetFile}`,
      slug: cleanSlug,
      filename: targetFile,
      mode: savedMode,
      timestamp: fullPayload._savedAt,
    });
  } catch (error: any) {
    console.error("[API /api/proposals POST Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error interno al guardar propuesta" },
      { status: 500 }
    );
  }
}
