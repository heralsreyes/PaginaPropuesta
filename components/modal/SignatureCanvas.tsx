"use client";

import React, { useRef, useState, useEffect } from "react";
import { Eraser, PenTool, Type } from "lucide-react";

interface SignatureCanvasProps {
  onSignatureChange: (dataUrl: string | null) => void;
  signerName?: string;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSignatureChange,
  signerName = "",
}) => {
  const [signatureMode, setSignatureMode] = useState<"draw" | "type">("draw");

  // Draw Mode State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnSignature, setHasDrawnSignature] = useState(false);

  // Type Mode State
  const [typedName, setTypedName] = useState("");
  const [selectedFont, setSelectedFont] = useState<string>("cursive");

  // Sync typed name with external signerName if provided initial value
  useEffect(() => {
    if (signerName && !typedName) {
      setTypedName(signerName);
    }
  }, [signerName]);

  // Setup canvas drawing context
  useEffect(() => {
    if (signatureMode !== "draw") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#004F54";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [signatureMode]);

  // Helper to render typed signature to DataURL PNG
  const updateTypedSignature = (text: string, fontType: string) => {
    if (!text.trim()) {
      onSignatureChange(null);
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 140;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Baseline rule
    ctx.strokeStyle = "#CBD5E1";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(40, 110);
    ctx.lineTo(440, 110);
    ctx.stroke();

    // Text signature
    ctx.fillStyle = "#004F54";
    if (fontType === "cursive") {
      ctx.font = "italic bold 34px 'Brush Script MT', 'Dancing Script', 'Caveat', cursive, sans-serif";
    } else if (fontType === "serif") {
      ctx.font = "italic 32px 'Georgia', 'Playfair Display', serif";
    } else {
      ctx.font = "bold 28px 'Courier New', monospace";
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(text, canvas.width / 2, 60);

    onSignatureChange(canvas.toDataURL("image/png"));
  };

  const handleTypedNameChange = (val: string) => {
    setTypedName(val);
    updateTypedSignature(val, selectedFont);
  };

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    updateTypedSignature(typedName, font);
  };

  const switchMode = (mode: "draw" | "type") => {
    setSignatureMode(mode);
    if (mode === "type") {
      updateTypedSignature(typedName, selectedFont);
    } else {
      const canvas = canvasRef.current;
      if (canvas && hasDrawnSignature) {
        onSignatureChange(canvas.toDataURL("image/png"));
      } else {
        onSignatureChange(null);
      }
    }
  };

  // Canvas Drawing Handlers
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();

    if (!hasDrawnSignature) {
      setHasDrawnSignature(true);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas && hasDrawnSignature) {
      onSignatureChange(canvas.toDataURL("image/png"));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnSignature(false);
    onSignatureChange(null);
  };

  return (
    <div className="space-y-3">
      {/* Header & Mode Switch Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
          Firma Digital *
        </label>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => switchMode("draw")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              signatureMode === "draw"
                ? "bg-[#004F54] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>✍️ Dibujar Trazo</span>
          </button>
          <button
            type="button"
            onClick={() => switchMode("type")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              signatureMode === "type"
                ? "bg-[#004F54] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>⌨️ Escribir por Teclado</span>
          </button>
        </div>
      </div>

      {/* DRAW MODE CANVAS */}
      {signatureMode === "draw" && (
        <div className="space-y-2">
          <div className="relative border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 overflow-hidden touch-none hover:border-[#004F54] transition-colors">
            <canvas
              ref={canvasRef}
              width={480}
              height={140}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-36 cursor-crosshair"
            />

            {!hasDrawnSignature && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-400 text-xs font-medium">
                Dibuje su firma en este recuadro usando mouse o pantalla táctil
              </div>
            )}
          </div>

          {hasDrawnSignature && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearCanvas}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-bold cursor-pointer"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Limpiar Trazo</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TYPE MODE KEYBOARD INPUT */}
      {signatureMode === "type" && (
        <div className="space-y-3">
          <div>
            <input
              type="text"
              value={typedName}
              onChange={(e) => handleTypedNameChange(e.target.value)}
              placeholder="Escriba su nombre completo para generar la firma por teclado..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium text-xs focus:ring-2 focus:ring-[#004F54]"
            />
          </div>

          {/* Font Style Selection Chips */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500 font-bold">Estilo:</span>
            {[
              { id: "cursive", name: "✒️ Cursiva Manuscrita" },
              { id: "serif", name: "📜 Elegante Formal" },
              { id: "mono", name: "💻 Código Seguro" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFontChange(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedFont === f.id
                    ? "bg-[#F08D17] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          {/* Live Typed Signature Preview Box */}
          <div className="relative border-2 border-dashed border-slate-300 rounded-2xl bg-white p-6 h-36 flex flex-col items-center justify-center text-center overflow-hidden">
            {typedName.trim() ? (
              <div className="space-y-1">
                <span
                  className={`text-2xl sm:text-3xl text-[#004F54] block tracking-wide select-none ${
                    selectedFont === "cursive"
                      ? "font-serif italic font-bold tracking-widest text-3xl"
                      : selectedFont === "serif"
                      ? "font-serif italic text-2xl"
                      : "font-mono font-bold"
                  }`}
                  style={{
                    fontFamily:
                      selectedFont === "cursive"
                        ? "'Brush Script MT', 'Dancing Script', 'Caveat', cursive, sans-serif"
                        : undefined,
                  }}
                >
                  {typedName}
                </span>
                <div className="w-64 h-0.5 border-b border-dashed border-slate-300 mx-auto pt-1" />
                <span className="text-[10px] font-mono text-slate-400 font-bold block pt-1">
                  ✓ FIRMA DIGITAL TIPOGRÁFICA GENERADA
                </span>
              </div>
            ) : (
              <span className="text-slate-400 text-xs font-medium">
                Escriba su nombre arriba para previsualizar la firma por teclado
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
