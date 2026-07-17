import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, 'content/docs/block-1-master-frontend');

function extractFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = match[1];
  const title = fm.match(/title:\s*"(.+?)"/)?.[1] || '';
  const order = parseInt(fm.match(/order:\s*(\d+)/)?.[1] || '999');
  return { title, order };
}

function buildSidebar(dir, urlPrefix) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const dirs = entries.filter(e => e.isDirectory() && !e.name.startsWith('.')).sort((a, b) => a.name.localeCompare(b.name));
  const files = entries.filter(e => e.isFile() && e.name.endsWith('.mdx')).sort((a, b) => a.name.localeCompare(b.name));

  const items = [];

  for (const f of files) {
    const fm = extractFrontmatter(path.join(dir, f.name));
    const slug = f.name.replace(/\.mdx$/, '');
    items.push({ label: fm?.title || slug, link: `${urlPrefix}/${slug}/`, _order: fm?.order || 999 });
  }

  const weekLabels = {
    'tuan-1-1-js-core-engine-ts': 'Module 1.1: JS Core + Engine + TypeScript',
    'tuan-1-2-build-tool-nextjs-tailwind': 'Module 1.2: Build Tool + Next.js + Tailwind',
    'tuan-1-3-seo-mdx-i18n-css': 'Module 1.3: SEO + MDX Blog + i18n + CSS Modern',
    'tuan-1-4-form-git-deploy': 'Module 1.4: Form + Git Teamwork + Deploy',
    'tuan-2-1-react-fiber-optimization': 'Module 2.1: React Fiber & Optimization',
    'tuan-2-2-state-management': 'Module 2.2: State Management (TanStack Query + Zustand)',
    'tuan-2-3-xstate-form-stripe': 'Module 2.3: XState + Form Engineering + Stripe',
    'tuan-2-4-error-pwa-e2e-deploy': 'Module 2.4: Error Handling + PWA + E2E + Deploy',
    'tuan-3-1-redux-ecosystem': 'Module 3.1: Redux Ecosystem + Web APIs',
    'tuan-3-2-dashboard-ui': 'Module 3.2: Dashboard UI (Data Viz + Virtual Scroll)',
    'tuan-3-3-monorepo-storybook-bff': 'Module 3.3: Monorepo + Storybook + BFF',
    'tuan-3-4-role-realtime-perf-deploy': 'Module 3.4: Role-based + Real-time + Performance',
    'tuan-4-1-websocket-realtime-git': 'Module 4.1: WebSockets + Real-time + Git Advanced',
    'tuan-4-2-animation-performance': 'Module 4.2: Animation + Performance',
    'tuan-4-3-upload-workers-storage': 'Module 4.3: File Upload + Web Workers + Storage',
    'tuan-4-4-seo-deploy': 'Module 4.4: SEO Dynamic + Deploy',
    'tuan-5-1-design-tokens-primitives': 'Module 5.1: Design Tokens + Component Primitives',
    'tuan-5-2-custom-components': 'Module 5.2: Custom Components',
    'tuan-5-3-storybook-chromatic-publish': 'Module 5.3: Storybook + Chromatic + Publish',
    'tuan-5-4-polish-docs-war-stories': 'Module 5.4: Polish + Documentation + War Stories',
    'tuan-6-1-migration-strategy': 'Module 6.1: Migration Strategy',
    'tuan-6-2-implement-migration': 'Module 6.2: Implement Migration',
    'tuan-6-3-portfolio': 'Module 6.3: Tổng hợp Portfolio',
    'tuan-6-4-apply-job': 'Module 6.4: Apply Job'
  };

  for (const d of dirs) {
    if (d.name === 'documents') continue;
    const subItems = buildSidebar(path.join(dir, d.name), `${urlPrefix}/${d.name}`);

    let label = weekLabels[d.name];
    if (!label) {
      label = d.name
        .replace(/^tuan-(\d+)-(\d+)-/, 'Module $1.$2: ')
        .replace(/^tuan-(\d+)-/, 'Module $1: ')
        .replace(/-/g, ' ')
        .replace(/^\w/, c => c.toUpperCase());
    }
    if (subItems.length > 0) {
      items.push({ label, collapsed: true, items: subItems });
    }
  }

  return items
    .sort((a, b) => (a._order || 0) - (b._order || 0))
    .map(({ _order, ...rest }) => rest);
}

const months = fs.readdirSync(BASE, { withFileTypes: true })
  .filter(e => e.isDirectory() && e.name.startsWith('thang-'))
  .sort((a, b) => a.name.localeCompare(b.name));

const monthLabels = {
  'thang-1-nen-tang-core': 'Tháng 1: Nền tảng Core + P1',
  'thang-2-react-nextjs-deep-dive': 'Tháng 2: React/Next.js + P2',
  'thang-3-state-management-dashboard': 'Tháng 3: State Mgmt + P3',
  'thang-4-realtime-animation-social': 'Tháng 4: Real-time + P4',
  'thang-5-ui-engineering-design-system': 'Tháng 5: UI Engineering + P5',
  'thang-6-legacy-migration-portfolio': 'Tháng 6: Migration + Portfolio',
};

export const block1Roadmap = [
  { label: 'Overview', link: '/block-1-master-frontend/overview/' },
  ...months.map(m => ({
    label: monthLabels[m.name] || m.name,
    collapsed: true,
    items: buildSidebar(path.join(BASE, m.name), `/block-1-master-frontend/${m.name}`),
  }))
];
