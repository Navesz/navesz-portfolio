import type { MetadataRoute } from "next"
import { site } from "@/conteudo/carregar"
export const dynamic = "force-static"
export default function manifest(): MetadataRoute.Manifest {
  const base = site.meta.urlBase
  return {
    name: site.identidade.nome,
    short_name: site.meta.nomeCurto,
    description: site.meta.descricao,
    start_url: base + "/",
    scope: base + "/",
    display: "standalone",
    lang: site.meta.idioma,
    background_color: site.meta.cores.fundo,
    theme_color: site.meta.cores.tema,
    icons: [
      { src: base + "/icone-192.png", sizes: "192x192", type: "image/png" },
      {
        src: base + "/icone-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
