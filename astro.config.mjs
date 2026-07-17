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
