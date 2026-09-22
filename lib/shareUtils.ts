/**
 * Utilities for generating and decoding self-contained, portable proposal share links
 * using native browser CompressionStream (deflate) and base64url encoding.
 */

import { ExtendedProposalPayload } from "@/context/ProposalContext";

/**
 * Compresses an object payload into a base64url-encoded string using native deflate compression.
 */
export async function compressProposalToHash(payload: ExtendedProposalPayload | any): Promise<string> {
  try {
    const jsonString = JSON.stringify(payload);
    const stream = new Blob([jsonString]).stream().pipeThrough(new CompressionStream("deflate"));
    const response = new Response(stream);
    const buffer = await response.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    // base64url: URL-safe, no plus, slash, or trailing equals
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (error) {
    console.error("[shareUtils] Error compressing proposal to hash:", error);
    throw error;
  }
}

/**
 * Decompresses a base64url-encoded string into an object payload using native deflate decompression.
 */
export async function decompressProposalFromHash(hashString: string): Promise<ExtendedProposalPayload | null> {
  try {
    if (!hashString || typeof hashString !== "string") return null;

    // Clean hash markers if passed with #d= or d=
    let clean = hashString.trim();
    if (clean.startsWith("#")) clean = clean.slice(1);
    if (clean.startsWith("d=")) clean = clean.slice(2);
    if (clean.startsWith("data=")) clean = clean.slice(5);

    if (!clean) return null;

    // Convert base64url back to standard base64
    let base64 = clean.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }

    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate"));
    const response = new Response(stream);
    const jsonText = await response.text();

    return JSON.parse(jsonText);
  } catch (error) {
    console.error("[shareUtils] Error decompressing proposal from hash:", error);
    return null;
  }
}

export interface ShareUrlOptions {
  slug: string;
  payload?: ExtendedProposalPayload;
  cloudId?: string;
  mode?: "portable" | "short";
  includeAdmin?: boolean;
}

/**
 * Generates an absolute shareable URL based on the specified mode.
 * - 'portable': Includes compressed data in the hash fragment (#d=...), works on any device immediately.
 * - 'short': Uses clean query parameter (?p=slug&id=cloudId), fast and universally reachable from any device.
 */
export async function generateShareUrl(options: ShareUrlOptions): Promise<string> {
  const { slug, payload, cloudId, mode = "portable", includeAdmin = false } = options;

  const defaultOrigin = "https://pagina-propuesta-beta.vercel.app";
  let origin = defaultOrigin;
  if (typeof window !== "undefined") {
    // If not running on local development host, use current window origin
    if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      origin = window.location.origin;
    }
  }

  const cleanSlug = (slug || "propuesta")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const url = new URL(origin);
  url.pathname = "/";
  url.searchParams.set("p", cleanSlug);

  if (cloudId) {
    url.searchParams.set("id", cloudId);
  }

  if (includeAdmin) {
    url.searchParams.set("admin", "true");
  }

  if (mode === "portable" && payload) {
    try {
      const hashData = await compressProposalToHash(payload);
      url.hash = `d=${hashData}`;
    } catch (e) {
      console.warn("[shareUtils] Fallback to short url due to compression issue:", e);
    }
  }

  return url.toString();
}
