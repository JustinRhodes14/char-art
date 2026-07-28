import { chromium } from 'playwright-core'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))
const source = path.join(dir, 'og-card.html')
const output = path.join(dir, '../../public/og-image.png')

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto(`file://${source}`)
await page.waitForTimeout(300)
await page.screenshot({ path: output })
await browser.close()

console.log(`Wrote ${output}`)
