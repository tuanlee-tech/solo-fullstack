import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Resolve site URL theo môi trường:
// 1. SITE_URL  → set thủ công trong CF Pages → Production (custom domain hoặc pages.dev)
// 2. CF_PAGES_URL → tự động inject bởi Cloudflare Pages → Preview deployments
// 3. Fallback → localhost khi dev local
let SITE_URL = process.env.SITE_URL ?? process.env.CF_PAGES_URL ?? 'http://localhost:4321';
if (!SITE_URL.startsWith('http')) {
  SITE_URL = `https://${SITE_URL}`;
}

export default defineConfig({
  site: SITE_URL,
  integrations: [
    starlight({
      title: 'Solo Fullstack',
      tagline: 'From React to Staff/Architect or Solo Founder',
      logo: { src: './src/assets/logo.svg' },

      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      pagefind: true,
      lastUpdated: true,

      // Default OG image cho toàn bộ site (phải là absolute URL)
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: `${SITE_URL}/og-image.png` },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: `${SITE_URL}/og-image.png` },
        },
      ],

      // editLink: tắt vì repo private — bật lại nếu chuyển sang public
      // editLink: {
      //   baseUrl: 'https://github.com/tuanlee-tech/solo-fullstack/edit/main/',
      // },

      sidebar: [
        { label: 'Home', link: '/' },
        {
          label: 'Overview',
          items: [
            { label: 'Roadmap Overview', link: '/overview/roadmap-overview/' },
          ],
        },
        {
          label: 'Block 1: Master Frontend',
          collapsed: false,
          items: [
            { label: 'Goals & Info', link: '/block-1-master-frontend/goals-and-info/' },
            { label: 'JS Core Engine', link: '/block-1-master-frontend/js-core-engine/' },
            { label: 'JS Engine & Runtime', link: '/block-1-master-frontend/js-engine-runtime/' },
            { label: 'TypeScript Advanced', link: '/block-1-master-frontend/typescript-advanced/' },
            { label: 'Build Tools', link: '/block-1-master-frontend/build-tools/' },
            { label: 'Package Managers', link: '/block-1-master-frontend/package-managers/' },
            { label: 'Design Patterns', link: '/block-1-master-frontend/design-patterns/' },
            { label: 'React & Next.js', link: '/block-1-master-frontend/react-nextjs-deep-dive/' },
            { label: 'UI/UX & Styling', link: '/block-1-master-frontend/ui-ux-styling/' },
            { label: 'Testing & Performance', link: '/block-1-master-frontend/testing-performance/' },
            { label: 'Ecosystem', link: '/block-1-master-frontend/ecosystem/' },
            { label: 'System Design & Security', link: '/block-1-master-frontend/system-design-security/' },
            { label: 'Projects', link: '/block-1-master-frontend/projects/' },
            { label: 'Weekly Roadmap', link: '/block-1-master-frontend/weekly-roadmap/' },
            { label: 'Job Checklist', link: '/block-1-master-frontend/job-checklist/' },
            {
              label: 'Appendix',
              collapsed: true,
              items: [
                { label: 'Knowledge Gap', link: '/block-1-master-frontend/knowledge-gap/' },
                { label: 'Block Breakdown', link: '/block-1-master-frontend/block-breakdown/' },
              ],
            },
          ],
        },
        {
          label: 'Block 2: Master Backend',
          collapsed: true,
          items: [
            { label: 'Goals & Info', link: '/block-2-master-backend/goals-and-info/' },
            { label: 'NestJS Foundation', link: '/block-2-master-backend/nestjs-foundation/' },
            { label: 'Database & SQL', link: '/block-2-master-backend/database-sql/' },
            { label: 'Prisma ORM', link: '/block-2-master-backend/prisma-orm/' },
            { label: 'REST / GraphQL / tRPC', link: '/block-2-master-backend/rest-graphql-trpc/' },
            { label: 'Auth & Security', link: '/block-2-master-backend/auth-security/' },
            { label: 'Payment & Stripe', link: '/block-2-master-backend/payment-stripe/' },
            { label: 'Search, Email & Jobs', link: '/block-2-master-backend/search-email-jobs/' },
            { label: 'Realtime & WebSockets', link: '/block-2-master-backend/realtime-websockets/' },
            { label: 'API Design', link: '/block-2-master-backend/api-design/' },
            { label: 'Event Driven', link: '/block-2-master-backend/event-driven/' },
            { label: 'LLM & RAG', link: '/block-2-master-backend/llm-rag/' },
            { label: 'Backend System Design', link: '/block-2-master-backend/backend-system-design/' },
            { label: 'Project: SaaS API', link: '/block-2-master-backend/project-saas-api/' },
            {
              label: 'Appendix',
              collapsed: true,
              items: [
                { label: 'Knowledge Gap', link: '/block-2-master-backend/knowledge-gap/' },
                { label: 'Block Breakdown', link: '/block-2-master-backend/block-breakdown/' },
              ],
            },
          ],
        },
        {
          label: 'Block 3: DevOps Basics',
          collapsed: true,
          items: [
            { label: 'Goals & Info', link: '/block-3-devops-basics/goals-and-info/' },
            { label: 'Docker', link: '/block-3-devops-basics/docker/' },
            { label: 'Linux VPS', link: '/block-3-devops-basics/linux-vps/' },
            { label: 'CI/CD GitHub Actions', link: '/block-3-devops-basics/cicd-github-actions/' },
            { label: 'Nginx & Proxy', link: '/block-3-devops-basics/nginx-proxy/' },
            { label: 'SSL & Cloudflare', link: '/block-3-devops-basics/ssl-cloudflare/' },
            { label: 'Deploy Vercel / Railway', link: '/block-3-devops-basics/deploy-vercel-railway/' },
            { label: 'Observability', link: '/block-3-devops-basics/observability/' },
            { label: 'Production Readiness', link: '/block-3-devops-basics/production-readiness/' },
            { label: 'Project: Solo Deploy', link: '/block-3-devops-basics/project-solo-deploy/' },
            {
              label: 'Appendix',
              collapsed: true,
              items: [
                { label: 'Knowledge Gap', link: '/block-3-devops-basics/knowledge-gap/' },
                { label: 'Block Breakdown', link: '/block-3-devops-basics/block-breakdown/' },
              ],
            },
          ],
        },
        {
          label: 'Branch A: Staff/Architect',
          collapsed: true,
          items: [],
        },
        {
          label: 'Branch B: Solo Founder',
          collapsed: true,
          items: [],
        },
      ],
      customCss: [
        '@fontsource/inter',
        './src/styles/custom.css'
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/tuanlee-tech/solo-fullstack' }
      ],

      defaultLocale: 'root',
      locales: {
        root: { label: 'Tiếng Việt', lang: 'vi' },
        en: { label: 'English', lang: 'en' },
      },
    }),
  ],
});
