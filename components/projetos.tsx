"use client"

import { useState } from "react"
import { ArrowUpRight, Code2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { portfolio, Projeto } from "@/conteudo/portfolio"

function Ilustracao({ projeto }: { projeto: Projeto }) {
  return (
    <div
      className={"projeto-visual visual-" + projeto.visual}
      aria-hidden="true"
    >
      <div className="visual-topo">
        <span>{projeto.linhas[0]}</span>
        <span>↗</span>
      </div>
      {projeto.visual === "rebar" && (
        <div className="terminal">
          {projeto.linhas.slice(1).map((linha, i) => (
            <div key={linha} className={i === 3 ? "terminal-fim" : ""}>
              {linha}
            </div>
          ))}
          <div className="barras">
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>
      )}
      {projeto.visual === "prumo" && (
        <div className="quadros">
          <i />
          <i />
          <i />
        </div>
      )}
      {projeto.visual === "pista" && (
        <svg viewBox="0 0 500 260" className="desenho-pista">
          <path
            className="pista-fundo"
            d="M115 185C42 175 48 80 123 70L316 45C401 30 448 73 414 120L355 192C331 220 285 230 251 190L216 149C196 130 179 160 163 174Z"
          />
          <path
            className="pista-linha"
            d="M115 185C42 175 48 80 123 70L316 45C401 30 448 73 414 120L355 192C331 220 285 230 251 190L216 149C196 130 179 160 163 174Z"
          />
          <circle cx="307" cy="47" r="8" />
          <circle className="ponto" cx="216" cy="149" r="6" />
        </svg>
      )}
      {projeto.visual === "pecas" && (
        <div className="engrenagens">
          <i />
          <i />
          <i />
        </div>
      )}
      {projeto.visual === "constelacao" && (
        <svg viewBox="0 0 500 260" className="estrelas">
          <path d="M62 160L141 65L270 97L398 48M141 65L218 205L270 97L370 181L398 48M62 160L218 205L370 181L447 218" />
          {[
            [62, 160],
            [141, 65],
            [270, 97],
            [398, 48],
            [218, 205],
            [370, 181],
            [447, 218],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 2 ? 9 : 5} />
          ))}
        </svg>
      )}
      {projeto.visual === "menu" && (
        <div className="menu-ilustrado">
          <div className="prato">
            <i />
            <i />
            <i />
          </div>
          <strong>{projeto.linhas[1]}</strong>
        </div>
      )}
      <div className="visual-legenda">
        {projeto.legenda}
        <span>{projeto.numero}</span>
      </div>
    </div>
  )
}

export function Projetos({ conteudo }: { conteudo: typeof portfolio }) {
  const [filtro, definirFiltro] = useState(conteudo.filtros[0])
  const projetos = conteudo.projetos.filter(
    (projeto) => filtro === conteudo.filtros[0] || projeto.categoria === filtro
  )
  return (
    <>
      <div className="barra-filtros">
        <div
          className="filtros"
          role="group"
          aria-label={conteudo.rotuloFiltro}
        >
          {conteudo.filtros.map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="filtro"
              aria-pressed={filtro === item}
              onClick={() => definirFiltro(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <p className="contador" role="status" aria-live="polite">
          {String(projetos.length).padStart(2, "0")}{" "}
          {projetos.length === 1
            ? conteudo.contagemSingular
            : conteudo.contagem}
        </p>
      </div>
      <div className="grade-projetos">
        {projetos.map((projeto) => (
          <article className="projeto" key={projeto.id}>
            <Ilustracao projeto={projeto} />
            <div className="projeto-corpo">
              <div className="projeto-tipo">
                <span>{projeto.tipo}</span>
                <span>{projeto.numero}</span>
              </div>
              <h3>
                {projeto.nome}
                <ArrowUpRight size={25} aria-hidden="true" />
              </h3>
              <p className="projeto-resumo">{projeto.descricao}</p>
              <p className="projeto-detalhe">{projeto.detalhe}</p>
              <ul className="tags">
                {projeto.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="projeto-links">
                <a
                  href={projeto.github}
                  aria-label={conteudo.codigo + " — " + projeto.nome}
                >
                  <Code2 size={17} aria-hidden="true" />
                  {conteudo.codigo}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                {projeto.demo && (
                  <a
                    href={projeto.demo}
                    aria-label={conteudo.abrir + " — " + projeto.nome}
                  >
                    {conteudo.abrir}
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
