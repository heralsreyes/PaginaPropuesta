import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-satoshi" });

export const metadata: Metadata = {
  title: "Propuesta Técnica y Económica | ENFOCO S.R.L.",
  description:
    "Plataforma web de entrega de propuestas de desarrollo de software a la medida, automatización e ingeniería de procesos por ENFOCO, S.R.L.",
  openGraph: {
    title: "Propuesta de Desarrollo de Software | ENFOCO S.R.L.",
    description: "Soluciones de software enterprise y automatización a la medida para empresas.",
    url: "https://enfoco.com.do",
    siteName: "ENFOCO S.R.L.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-[#FAF9F6] text-[#111111] antialiased selection:bg-[#2563EB] selection:text-white`}>
        {children}
        <Toaster position="bottom-right" theme="light" richColors />
      </body>
    </html>
  );
}
