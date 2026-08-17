import type { Metadata } from "next";
import { Inter, Outfit, Roboto, Fira_Code, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-roboto" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
      <body className={`${inter.variable} ${outfit.variable} ${roboto.variable} ${firaCode.variable} ${playfair.variable} font-sans bg-[#FAF9F6] text-[#111111] antialiased selection:bg-[#2563EB] selection:text-white`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                  }
                });
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    for (let name of names) caches.delete(name);
                  });
                }
              }
            `,
          }}
        />
        {children}
        <Toaster position="bottom-right" theme="light" richColors />
      </body>
    </html>
  );
}
