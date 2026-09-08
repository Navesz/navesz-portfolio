import type { NextConfig } from 'next'
import { site } from './conteudo/carregar'
const nextConfig: NextConfig = {
  output: 'export',
  basePath: new URL(site.meta.urlBase).pathname.replace(/\/$/, ''),
  trailingSlash: true,
  images: { unoptimized: true },
}
export default nextConfig
