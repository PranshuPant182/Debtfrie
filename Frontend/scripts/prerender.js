import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

const routes = [
  '/',
  '/about-us',
  '/debt-resolution',
  '/debt-restructuring',
  '/testimonials',
  '/faqs',
  '/blog',
  '/enquiry',
  '/contact-us'
];

const getContentType = (filePath) => {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.js': return 'application/javascript';
    case '.css': return 'text/css';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    default: return 'text/html';
  }
};

const startServer = (port) => {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let safePath = req.url.split('?')[0].split('#')[0];
      let filePath = path.join(DIST_DIR, safePath);
      
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(DIST_DIR, 'index.html');
      }

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end(`Error loading file: ${err.code}`);
        } else {
          res.writeHead(200, { 'Content-Type': getContentType(filePath) });
          res.end(content, 'utf-8');
        }
      });
    });

    server.listen(port, () => {
      resolve(server);
    });
  });
};

async function prerender() {
  const PORT = 45000 + Math.floor(Math.random() * 1000);
  console.log(`[Prerender] Starting local static server on port ${PORT}...`);
  const server = await startServer(PORT);
  
  console.log('[Prerender] Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    for (const route of routes) {
      const url = `http://localhost:${PORT}${route}`;
      console.log(`[Prerender] Crawling ${url}...`);

      await page.goto(url, { waitUntil: 'networkidle2' });
      // Let any CSS transitions/React queries complete
      await new Promise(r => setTimeout(r, 1500));

      const htmlContent = await page.content();

      let targetFile;
      if (route === '/') {
        targetFile = path.join(DIST_DIR, 'index.html');
      } else {
        const routeDir = path.join(DIST_DIR, route.substring(1));
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        targetFile = path.join(routeDir, 'index.html');
      }

      fs.writeFileSync(targetFile, htmlContent, 'utf8');
      console.log(`[Prerender] Successfully generated: ${targetFile}`);
    }
  } catch (error) {
    console.error('[Prerender] Error during execution:', error);
  } finally {
    console.log('[Prerender] Closing browser...');
    await browser.close();
    console.log('[Prerender] Shutting down static server...');
    server.close();
    console.log('[Prerender] Done!');
  }
}

prerender();
