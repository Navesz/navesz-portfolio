import bruto from "./portfolio.json"
import { objeto, texto, lista, opcional, ErroDeConteudo } from "./esquema"
const linha = texto(1, 400)
const link = (valor: unknown, caminho: string): string => {
  const resultado = linha(valor, caminho)
  const url = new URL(resultado)
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new ErroDeConteudo(caminho + ": esperado link HTTPS sem credenciais")
  }
  return resultado
}
const forma = objeto({
  navegacao: linha,
  contagemSingular: linha,
  marca: linha,
  selo: linha,
  pular: linha,
  menu: lista(objeto({ texto: linha, destino: texto(2, 40) }), 1, 4),
  github: objeto({ texto: linha, url: link }),
  chamada: linha,
  secundaria: linha,
  nota: linha,
  indice: linha,
  tituloProjetos: linha,
  introProjetos: linha,
  filtros: lista(linha, 1, 8),
  rotuloFiltro: linha,
  contagem: linha,
  codigo: linha,
  abrir: linha,
  detalhes: linha,
  destaque: linha,
  origem: linha,
  repositorio: link,
  projetos: lista(
    objeto({
      id: texto(1, 60),
      nome: linha,
      categoria: linha,
      tipo: linha,
      descricao: linha,
      detalhe: linha,
      tags: lista(linha, 1, 6),
      github: link,
      demo: opcional(link),
      visual: linha,
      legenda: linha,
      linhas: lista(linha, 1, 8),
      numero: linha,
    }),
    1,
    30
  ),
  sobre: objeto({
    indice: linha,
    titulo: linha,
    texto: linha,
    nota: linha,
    assinatura: linha,
    cta: linha,
    textoCta: linha,
    botao: linha,
  }),
  rodape: objeto({
    credito: linha,
    fonte: linha,
    voltar: linha,
    ano: linha,
    edicao: linha,
  }),
  visual: objeto({
    titulo: linha,
    centro: linha,
    orbita: linha,
    base: linha,
    lista: lista(linha, 1, 8),
  }),
})
export const portfolio = forma(bruto, "portfolio")
const ids = new Set<string>()
for (const projeto of portfolio.projetos) {
  if (
    ids.has(projeto.id) ||
    !portfolio.filtros.slice(1).includes(projeto.categoria)
  ) {
    throw new ErroDeConteudo(
      "Projeto duplicado ou categoria sem filtro: " + projeto.id
    )
  }
  ids.add(projeto.id)
}
export type Projeto = (typeof portfolio.projetos)[number]
