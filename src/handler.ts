import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'

const compatDomains = new Set([
  'burner.glitchbread.xyz',
  'cendyne.glitchbread.xyz',
  'fen.glitchbread.xyz',
  'nican.glitchbread.xyz',
  'nic.glitchbread.xyz',
  'sparky.glitchbread.xyz',
  'zenith.glitchbread.xyz',
])

const app = new Hono()
app.use('*', logger(), cors({ origin: '*' }), etag())

app.get('/', (ctx) => {
  const { host } = ctx.req.header()
  if (compatDomains.has(host)) {
    const name = (host.match(/^.+?(?=\.)/) || ['impossible'])[0]
    return ctx.redirect(`https://wah.rest/sticker/${name}/glitch-bread`, 301)
  } else {
    return ctx.redirect('https://bread.cendyne.dev/', 301)
  }
})

app.get('/:name', (ctx) => {
  const { name } = ctx.req.param()
  return ctx.redirect(`https://wah.rest/sticker/${name}/glitch-bread`, 301)
})

export async function handleRequest(event: FetchEvent): Promise<Response> {
  return app.handleEvent(event)
}
