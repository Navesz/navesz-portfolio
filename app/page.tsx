import type { ReactNode } from "react"
import { ArrowUpRight, ArrowDown, ArrowUp, Code2, Asterisk } from "lucide-react"
import { linkWhatsapp, site, type Contato } from "@/conteudo/carregar"
import { portfolio as p } from "@/conteudo/portfolio"
import { Projetos } from "@/components/projetos"

const CONTATOS = {
  whatsapp: ({ whatsapp }: Contato) =>
    whatsapp && <a href={linkWhatsapp(whatsapp)}>{whatsapp.exibicao}</a>,
  email: ({ email }: Contato) =>
    email && <a href={`mailto:${email}`}>{email}</a>,
  endereco: ({ endereco }: Contato) =>
    endereco && (
      <address>
        {endereco.logradouro}
        {", "}
        {endereco.bairro}
        {" — "}
        {endereco.cidade}
        {"/"}
        {endereco.uf}
        {" · "}
        {endereco.cep}
      </address>
    ),
} satisfies { [Bloco in keyof Contato]: (contato: Contato) => ReactNode }

export default function Pagina() {
  return (
    <div id="topo">
      <a className="pular" href="#conteudo">
        {p.pular}
      </a>
      <header className="cabecalho largura">
        <a className="marca" href="#topo" aria-label={site.identidade.nome}>
          <span className="marca-simbolo">↗</span>
          {p.marca}
          <span className="marca-ponto">.</span>
        </a>
        <nav aria-label={p.navegacao}>
          <div className="menu-links">
            {p.menu.map((item) => (
              <a key={item.destino} href={item.destino}>
                {item.texto}
              </a>
            ))}
          </div>
          <a href={p.github.url} className="github-topo">
            <Code2 size={17} aria-hidden="true" />
            {p.github.texto}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      </header>
      <main id="conteudo">
        <section className="hero largura">
          <div className="hero-conteudo">
            <p className="sobretitulo">
              <span className="ponto-verde" />
              {p.selo}
            </p>
            <h1>
              {site.home.titulo.split("\n")[0]}
              <br />
              <span>{site.home.titulo.split("\n")[1]}</span>
            </h1>
            <p className="hero-descricao">{site.home.subtitulo}</p>
            <div className="hero-acoes">
              <a className="botao-principal" href="#projetos">
                {p.chamada}
                <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a className="link-simples" href="#sobre">
                {p.secundaria}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <p className="hero-nota">{p.nota}</p>
          </div>
          <div className="orbital" aria-hidden="true">
            <div className="orbital-cabeca">
              <span>{p.visual.titulo}</span>
              <Asterisk size={19} />
            </div>
            <div className="orbital-campo">
              <div className="orbita orbita-um" />
              <div className="orbita orbita-dois" />
              <div className="orbita orbita-tres" />
              <div className="nucleo">
                {p.visual.centro}
                <span>↗</span>
              </div>
              <i className="satelite s-um" />
              <i className="satelite s-dois" />
              <i className="satelite s-tres" />
              <div className="cruz c-um">+</div>
              <div className="cruz c-dois">+</div>
            </div>
            <div className="orbital-rodape">
              <span>{p.visual.base}</span>
              <span>↗</span>
            </div>
          </div>
        </section>
        <div className="faixa">
          <div className="largura">
            {p.visual.lista.map((item) => (
              <span key={item}>
                {item}
                <Asterisk size={17} aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
        <section id="projetos" className="secao-projetos largura">
          <p className="sobretitulo">{p.indice}</p>
          <div className="titulo-secao">
            <h2>{p.tituloProjetos}</h2>
            <p>{p.introProjetos}</p>
          </div>
          <Projetos conteudo={p} />
        </section>
        <section id="sobre" className="sobre">
          <div className="largura">
            <p className="sobretitulo">{p.sobre.indice}</p>
            <div className="sobre-grade">
              <div>
                <h2>{p.sobre.titulo}</h2>
                <p className="sobre-intro">{p.sobre.texto}</p>
                <p className="sobre-nota">{p.sobre.nota}</p>
                <div className="assinatura">
                  <span className="avatar">↗</span>
                  {p.sobre.assinatura}
                </div>
              </div>
              <ol className="principios">
                {site.home.destaques.map((item, i) => (
                  <li key={item.titulo}>
                    <span className="principio-numero">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{item.titulo}</h3>
                      <p>{item.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
        <section className="convite largura">
          <Asterisk
            className="asterisco-grande"
            size={72}
            strokeWidth={1}
            aria-hidden="true"
          />
          <h2>{p.sobre.cta}</h2>
          <p>{p.sobre.textoCta}</p>
          <a className="botao-principal" href={p.github.url}>
            {p.sobre.botao}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </section>
      </main>
      <footer className="rodape largura">
        <div className="rodape-principal">
          <a className="marca" href="#topo">
            {p.marca}
            <span className="marca-ponto">.</span>
          </a>
          <p>{p.rodape.credito}</p>
          <a href={p.repositorio}>
            {p.rodape.fonte}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="rodape-inferior">
          <span>{p.rodape.ano}</span>
          <span>{p.rodape.edicao}</span>
          <a href="#topo">
            {p.rodape.voltar}
            <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
        {Object.entries(CONTATOS).map(([bloco, montar]) => (
          <div key={bloco}>{montar(site.identidade)}</div>
        ))}
      </footer>
    </div>
  )
}
