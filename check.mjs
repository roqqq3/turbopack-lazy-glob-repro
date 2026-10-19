// Reports which widget signatures are in the chunks the page loads up front (its entry scripts),
// and which only exist in chunks that load on demand.
import fs from 'node:fs';
import path from 'node:path';

const manifestFile = '.next/server/app/page_client-reference-manifest.js';
const source = fs.readFileSync(manifestFile, 'utf8');
const manifest = JSON.parse(source.slice(source.indexOf('= {') + 2).trim().replace(/;$/, ''));
const entryFiles = new Set(Object.values(manifest.entryJSFiles).flat());

const chunksDir = '.next/static/chunks';
const chunkText = (file) => fs.readFileSync(path.join('.next', file), 'utf8');
const allChunks = fs.readdirSync(chunksDir).filter((f) => f.endsWith('.js')).map((f) => `static/chunks/${f}`);

for (const signature of ['WIDGET_A_SIGNATURE', 'WIDGET_B_SIGNATURE', 'WIDGET_C_SIGNATURE']) {
  const chunks = allChunks.filter((f) => chunkText(f).includes(signature));
  const eager = chunks.some((f) => entryFiles.has(f));
  console.log(`${signature}: ${eager ? 'EAGER (in the page entry scripts)' : 'lazy (async chunk only)'}`);
}
