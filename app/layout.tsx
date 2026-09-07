import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { site } from "@/conteudo/carregar"
const fonte = Geist({ subsets: ["latin"], variable: "--fonte-sans" })
const mono = Geist_Mono({ subsets: ["latin"], variable: "--fonte-mono" })
const base = site.meta.urlBase
export const viewport: Viewport = { themeColor: site.meta.cores.fundo }
export const metadata: Metadata = {
  metadataBase: new URL(base + "/"),
  title: { default: site.meta.titulo, template: site.meta.gabaritoDeTitulo },
  description: site.meta.descricao,
  applicationName: site.identidade.nome,
  alternates: { canonical: base + "/" },
  manifest: base + "/manifest.webmanifest",
  icons: { icon: base + "/icone-192.png", apple: base + "/icone-192.png" },
  openGraph: {
    type: "website",
    locale: site.meta.idioma.replace("-", "_"),
    url: base + "/",
    siteName: site.identidade.nome,
    title: site.meta.titulo,
    description: site.meta.descricao,
    images: [
      {
        url: base + site.meta.og.caminho,
        width: site.meta.og.largura,
        height: site.meta.og.altura,
        alt: site.meta.og.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.titulo,
    description: site.meta.descricao,
    images: [base + site.meta.og.caminho],
  },
}
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={site.meta.idioma}
      className={fonte.variable + " " + mono.variable}
    >
      <body>{children}</body>
    </html>
  )
}
