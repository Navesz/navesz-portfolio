import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { esquemaSite } from '../conteudo/esquema.ts'
const base = JSON.parse(readFileSync(new URL('../conteudo/site.json', import.meta.url), 'utf8'))
test('GitHub Pages aceita subdiretório sem perder o caminho', () => {
  assert.equal(esquemaSite(base, 'site').meta.urlBase, base.meta.urlBase)
  assert.ok(new URL(base.meta.urlBase).pathname.length > 1)
})
test('URL de publicação recusa credenciais, fragmentos e caminhos normalizados', () => {
  for (const url of [
    'https://usuario:senha@dominio.com',
    'https://dominio.com/pasta/',
    'https://dominio.com/a/../b',
    'https://dominio.com/pasta?x=1',
    'https://dominio.com/#inicio',
  ]) {
    const candidato = structuredClone(base)
    candidato.meta.urlBase = url
    assert.throws(() => esquemaSite(candidato, 'site'), undefined, url)
  }
})
