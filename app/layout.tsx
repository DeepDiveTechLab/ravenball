import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ravenball.com"),
  title: "Ravenball | Ropa Deportiva Premium de Voleibol Femenil",
  description:
    "Uniformes de voleibol de alta calidad y precio accesible, diseñados exclusivamente para jugadoras en el Estado de México. Por mujeres, para mujeres.",
  keywords: [
    "Ravenball",
    "voleibol",
    "uniformes voleibol",
    "ropa deportiva femenil",
    "Naucalpan",
  ],
  openGraph: {
    title: "Ravenball | Ropa Deportiva Premium de Voleibol Femenil",
    description:
      "Uniformes de voleibol de alta calidad y precio accesible, diseñados exclusivamente para jugadoras en el Estado de México.",
    type: "website",
    images: ["/frames/frame-0001.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${montserrat.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--color-raven-900)]">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-accent)] focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Saltar al contenido
        </a>
        <CartProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main id="contenido" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
