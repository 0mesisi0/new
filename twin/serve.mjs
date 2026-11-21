import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const root = await realpath(fileURLToPath(new URL('.', import.meta.url)));
const host = '127.0.0.1';
const port = 5173;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

function insideRoot(file) {
  const location = relative(root, file);
  return !isAbsolute(location) && location !== '..' && !location.startsWith('..' + sep);
}

createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (pathname.includes('\0')) throw new URIError();
  } catch {
    response.writeHead(400).end();
    return;
  }

  try {
    const candidate = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!insideRoot(candidate)) {
      response.writeHead(403).end();
      return;
    }
    const file = await realpath(candidate);
    if (!insideRoot(file) || file.slice(root.length).split(sep).some(part => part.startsWith('.'))) {
      response.writeHead(403).end();
      return;
    }
    const info = await stat(file);
    if (!info.isFile()) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, {
      'Content-Type': mime[file.slice(file.lastIndexOf('.')).toLowerCase()] ?? 'application/octet-stream',
      'Content-Length': info.size,
      'X-Content-Type-Options': 'nosniff',
    });
    if (request.method === 'HEAD') response.end();
    else await pipeline(createReadStream(file), response);
  } catch (error) {
    if (response.headersSent) response.destroy();
    else response.writeHead(['ENOENT', 'ENOTDIR'].includes(error.code) ? 404 : 500).end();
  }
}).listen(port, host, () => console.log(`http://${host}:${port}/`));
