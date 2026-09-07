import { strict as assert } from "node:assert"
import { readFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { join } from "node:path"
const raiz = fileURLToPath(new URL("../", import.meta.url))
const site = JSON.parse(readFileSync(join(raiz, "conteudo/site.json"), "utf8"))
const portfolio = JSON.parse(
  readFileSync(join(raiz, "conteudo/portfolio.json"), "utf8")
)
const html = readFileSync(join(raiz, "out/index.html"), "utf8")
const base = site.meta.urlBase
const caminho = new URL(base).pathname
assert.ok(
  html.includes('rel="canonical" href="' + base + '/"'),
  "canonical aponta para o site"
)
assert.ok(
  html.includes('content="' + base + '/og.png"'),
  "imagem social preserva o subdiretório"
)
assert.ok(!html.includes("TROQUE-"), "nenhum placeholder no HTML")
for (const projeto of portfolio.projetos) {
  assert.ok(
    html.includes(projeto.nome),
    "projeto pré-renderizado: " + projeto.nome
  )
  assert.ok(
    html.includes(projeto.github),
    "código acessível sem JavaScript: " + projeto.nome
  )
}
let total = 0
for (const [, recurso] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (!recurso.startsWith(caminho + "/")) continue
  const relativo = decodeURIComponent(
    recurso.slice(caminho.length + 1).split("?")[0]
  )
  if (!relativo) continue
  assert.ok(
    existsSync(join(raiz, "out", relativo)),
    "recurso exportado: " + relativo
  )
  total++
}
const manifesto = JSON.parse(
  readFileSync(join(raiz, "out/manifest.webmanifest"), "utf8")
)
assert.equal(manifesto.start_url, base + "/")
assert.equal(manifesto.scope, base + "/")
for (const icone of manifesto.icons) {
  assert.ok(icone.src.startsWith(base + "/"))
  assert.ok(existsSync(join(raiz, "out", icone.src.slice(base.length + 1))))
}
assert.ok(readFileSync(join(raiz, "out/sitemap.xml"), "utf8").includes(base))
assert.ok(
  readFileSync(join(raiz, "out/robots.txt"), "utf8").includes(
    base + "/sitemap.xml"
  )
)
process.stdout.write(
  "Exportação validada: 6 projetos, canonical, OG, manifesto, sitemap e " +
    total +
    " referências locais.\n"
)
