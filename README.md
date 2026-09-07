# Navesz — laboratório aberto de software

Portfólio de projetos públicos de [Navesz](https://github.com/Navesz), criado de verdade com o gerador do [rebar](https://github.com/Navesz/rebar).

**Site:** https://navesz.github.io/navesz-portfolio/

Seis projetos, filtros por área, navegação por teclado, apresentação do laboratório e links para código e demonstrações. As ilustrações são CSS/SVG próprios; não representam capturas dos produtos.

## Desenvolvimento

Node.js 22.18 ou superior e npm.

```sh
npm ci
node .githooks/install.mjs
npm run dev
```

Abra http://localhost:3000/navesz-portfolio/.

```sh
npm run verificar
```

O comando executa lint, TypeScript, testes de contrato, build estático e inspeção dos recursos exportados. O GitHub Actions repete as verificações em Windows e Linux e só então publica a pasta `out/` no Pages.

## Conteúdo e publicação

- `conteudo/site.json`: identidade, SEO, cores e URL da publicação.
- `conteudo/portfolio.json`: projetos, links, categorias e textos visíveis.
- `conteudo/esquema.ts` e `conteudo/portfolio.ts`: validação antes da exportação.
- `next.config.ts`: exportação estática; o subdiretório é derivado da URL validada.
- `components/projetos.tsx`: filtros locais, sem chamadas externas.
- `.github/workflows/verificar.yml`: verificação e publicação.

Ao mudar de repositório ou domínio, atualize `meta.urlBase`, os links do portfólio e reconstrua. O Pages deve usar **GitHub Actions** como origem.

## Base técnica

Next.js 16, React 19, TypeScript, Tailwind CSS 4 e botão shadcn/base-nova sobre Base UI. A instalação de Next foi atualizada para 16.3.4 com eslint-config-next correspondente, pois a versão 16.2.6 recebida do scaffold apresentava alertas no npm audit. Nenhuma biblioteca adicional de interface foi instalada.

O servidor MCP local do rebar fica em `.rebar/mcp.mjs`. A configuração `.mcp.json` permite consultar as regras derivadas deste projeto. Os hooks verificam segredos e autoria humana antes do commit.

## Sobre os dados

Descrições e links se baseiam nos repositórios públicos do perfil em 7 de setembro de 2026. Não há e-mail, telefone, localização ou credenciais inventados. Projetos sem demonstração pública conhecida oferecem o link do código.

## Licença

Apache-2.0; veja LICENSE e NOTICE.
