import fs from 'fs';
import path from 'path';

const BASE = 'src/content/docs/block-1-master-frontend';

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Data: [monthSlug, monthLabel, [[weekSlug, weekLabel, [[dayTitle, dayDesc]]]]]
const months = [
  ['thang-1-nen-tang-core', 'Tháng 1: Nền tảng Core + Project 1', [
    ['tuan-1-1-js-core-engine-ts', 'Tuần 1.1: JS Core + Engine + TypeScript', [
      ['Execution Context, Hoisting, Scope Chain', 'Cơ chế hoisting, scope chain và execution context trong JavaScript.'],
      ['this Binding nâng cao, call/apply/bind, Prototype Chain', 'Hiểu sâu this binding và prototype chain trong JS.'],
      ['V8 Engine Pipeline, Ignition, TurboFan, JIT', 'Pipeline xử lý của V8: Ignition interpreter và TurboFan JIT compiler.'],
      ['Event Loop, Call Stack, Microtask vs Macrotask', 'Event Loop, Call Stack và thứ tự thực thi Microtask/Macrotask.'],
      ['Garbage Collection, Mark-and-Sweep, Generational GC', 'Cơ chế thu gom rác trong JavaScript engine.'],
      ['Memory Leaks, WeakRef, WeakMap', 'Nhận diện memory leak và sử dụng WeakRef/WeakMap.'],
      ['TypeScript Strict Mode, Type Guard, Generics Basics', 'TypeScript strict mode, type guard và generics cơ bản.'],
    ]],
    ['tuan-1-2-build-tool-nextjs-tailwind', 'Tuần 1.2: Build Tool + Next.js + Tailwind', [
      ['Webpack/Vite Bundling, Dev Server, HMR', 'Webpack và Vite: bundling, dev server, Hot Module Replacement.'],
      ['Tree-shaking, Code Splitting, Lazy Loading', 'Tối ưu bundle với tree-shaking, code splitting và lazy loading.'],
      ['Package Manager pnpm, Lockfile, Peer Deps', 'pnpm workspace, lockfile và xử lý peer dependencies.'],
      ['Next.js 14 App Router, Layouts, Server Components', 'Next.js 14 App Router: file-based routing, layouts, RSC.'],
      ['Client Components, Server Actions', 'Phân biệt Client Components và Server Actions trong Next.js.'],
      ['Tailwind Config, Custom Theme, Dark Mode', 'Cấu hình Tailwind CSS: custom theme và dark mode.'],
      ['shadcn/ui Setup, Component Customization', 'Thiết lập shadcn/ui và tuỳ biến component.'],
    ]],
    ['tuan-1-3-seo-mdx-i18n-css', 'Tuần 1.3: SEO + MDX Blog + i18n + CSS Modern', [
      ['Meta Tags, Open Graph, Sitemap', 'Meta tags, Open Graph protocol và sitemap.xml cho SEO.'],
      ['JSON-LD Structured Data, robots.txt', 'JSON-LD structured data và robots.txt configuration.'],
      ['MDX Blog Setup, Parse Markdown', 'Thiết lập MDX blog và parse markdown files.'],
      ['Syntax Highlighting rehype/remark, TOC', 'Syntax highlighting với rehype/remark và Table of Contents.'],
      ['next-i18n Setup, Locale Routing', 'Thiết lập next-i18n và locale routing.'],
      ['Translation Files, Language Switcher', 'Quản lý translation files và language switcher UI.'],
      ['CSS Modern @layer, Container Queries, :has()', 'CSS hiện đại: @layer, container queries, :has() selector.'],
    ]],
    ['tuan-1-4-form-git-deploy', 'Tuần 1.4: Form + Git Teamwork + Deploy', [
      ['Zod Schema Validation', 'Zod schema validation cho form và API data.'],
      ['Server Actions tích hợp Form', 'Server Actions tích hợp contact form và newsletter.'],
      ['Git Teamwork, Rebase, Merge, Conflict', 'Git teamwork: rebase, merge và conflict resolution.'],
      ['Lighthouse CI Setup, GitHub Actions', 'Thiết lập Lighthouse CI với GitHub Actions.'],
      ['Deploy Vercel, Custom Domain', 'Deploy lên Vercel và cấu hình custom domain.'],
      ['Sentry Error Monitoring Setup', 'Thiết lập Sentry error monitoring cho production.'],
      ['Review, Polish, README — P1 Complete', 'Review, polish code và viết README cho Project 1.'],
    ]],
  ]],
  ['thang-2-react-nextjs-deep-dive', 'Tháng 2: React/Next.js Deep Dive + Project 2', [
    ['tuan-2-1-react-fiber-optimization', 'Tuần 2.1: React Fiber & Optimization', [
      ['React Fiber, Reconciliation, Diffing', 'React Fiber architecture: reconciliation và diffing algorithm.'],
      ['Fiber Lanes, Priority Scheduling', 'Fiber lanes và priority scheduling trong React.'],
      ['Framework Evolution, Class to Hooks to v19', 'Lịch sử React: Class → Hooks → v19, Pages → App Router.'],
      ['Profiler DevTools, Unnecessary Renders', 'React Profiler DevTools và tìm unnecessary renders.'],
      ['useMemo/useCallback, Dependency Array', 'useMemo/useCallback: khi nào dùng và dependency array.'],
      ['React.memo, Shallow Comparison', 'React.memo: shallow comparison và custom comparator.'],
      ['useRef, DOM Ref, Mutable Ref', 'useRef: DOM ref, mutable ref và tránh re-render.'],
    ]],
    ['tuan-2-2-state-management', 'Tuần 2.2: State Management (TanStack Query + Zustand)', [
      ['useQuery, Fetching, Caching, Stale Time', 'TanStack Query useQuery: fetching, caching, stale time.'],
      ['useMutation, Cache Invalidation, Optimistic Update', 'useMutation, cache invalidation và optimistic update.'],
      ['Zustand Store, Slices Pattern', 'Zustand store cơ bản và slices pattern.'],
      ['Zustand Persist Middleware, Devtools', 'Zustand persist middleware và devtools integration.'],
      ['TanStack Query + Zustand Architecture', 'Kết hợp TanStack Query (server) + Zustand (client) state.'],
      ['Product Catalog với TanStack Query', 'Implement product catalog với TanStack Query.'],
      ['Cart với Zustand', 'Implement shopping cart với Zustand.'],
    ]],
    ['tuan-2-3-xstate-form-stripe', 'Tuần 2.3: XState + Form Engineering + Stripe', [
      ['XState States, Transitions, Context', 'XState cơ bản: states, transitions và context.'],
      ['Checkout Wizard Machine', 'Checkout wizard: Cart → Shipping → Payment → Confirmation.'],
      ['Form Engineering, react-hook-form + Zod', 'Form engineering: react-hook-form + Zod, field arrays.'],
      ['Zod Validation Multi-step Form', 'Zod validation cho multi-step form.'],
      ['i18n cho E-commerce', 'i18n cho e-commerce: product data và routing.'],
      ['Multi-currency Handling', 'Xử lý multi-currency trong e-commerce.'],
      ['Stripe Integration Test Mode', 'Stripe integration trong test mode.'],
    ]],
    ['tuan-2-4-error-pwa-e2e-deploy', 'Tuần 2.4: Error Handling + PWA + E2E + Deploy', [
      ['Error Boundary, Graceful Degradation', 'Error Boundary và graceful degradation pattern.'],
      ['Service Worker, Cache Strategy', 'Service Worker cơ bản và cache strategy.'],
      ['Offline Cart, manifest.json', 'Offline cart và PWA manifest.json configuration.'],
      ['Playwright Setup, Login Flow Test', 'Playwright setup và viết test cho login flow.'],
      ['E2E Test Full Checkout Flow', 'E2E test cho full checkout flow.'],
      ['Lighthouse Audit, Optimize CWV', 'Lighthouse audit và optimize Core Web Vitals.'],
      ['Review, Polish, ADR — P2 Complete', 'Review, polish và viết ADR cho Project 2.'],
    ]],
  ]],
  ['thang-3-state-management-dashboard', 'Tháng 3: State Management Nâng Cao + Project 3', [
    ['tuan-3-1-redux-ecosystem', 'Tuần 3.1: Redux Ecosystem + Web APIs', [
      ['Redux Core, Store, Actions', 'Redux Core: Store, Actions và data flow.'],
      ['Reducers, combineReducers', 'Reducers và combineReducers pattern.'],
      ['Redux Toolkit, configureStore, createSlice', 'Redux Toolkit: configureStore và createSlice.'],
      ['createAsyncThunk', 'createAsyncThunk cho async operations.'],
      ['RTK Query, createApi', 'RTK Query: createApi cơ bản.'],
      ['RTK Query Cache Tags, Invalidation', 'RTK Query: cache tags và invalidation strategy.'],
      ['Redux Saga, Effects, Watchers, Polling', 'Redux Saga: effects, watchers và polling pattern.'],
    ]],
    ['tuan-3-2-dashboard-ui', 'Tuần 3.2: Dashboard UI (Data Viz + Virtual Scroll)', [
      ['Recharts Line Chart, Bar Chart', 'Recharts: line chart và bar chart implementation.'],
      ['Recharts Pie Chart, Area Chart', 'Recharts: pie chart và area chart implementation.'],
      ['Data Table Sort, Filter', 'Data table: sort và filter functionality.'],
      ['Data Table Pagination', 'Data table: pagination implementation.'],
      ['react-window Virtualization', 'react-window: virtual list cơ bản.'],
      ['Virtual Scroll 10K+ Rows Optimization', 'Virtual scroll optimization cho 10K+ rows.'],
      ['Web Workers, CSV Parse, Image Compression', 'Web Workers: CSV parse và image compression.'],
    ]],
    ['tuan-3-3-monorepo-storybook-bff', 'Tuần 3.3: Monorepo + Storybook + BFF', [
      ['Turborepo Structure apps/packages', 'Turborepo: cấu trúc apps/packages.'],
      ['Shared-ui + Types Package', 'Shared-ui và types package trong monorepo.'],
      ['Storybook Setup', 'Storybook setup và configuration.'],
      ['Document Components, MDX Docs, Controls', 'Document components với MDX docs và controls.'],
      ['Chromatic Setup', 'Chromatic visual testing setup.'],
      ['Visual Regression Testing Workflow', 'Visual regression testing workflow.'],
      ['BFF Pattern, Next.js Route Handler', 'BFF Pattern: Next.js Route Handler vs standalone.'],
    ]],
    ['tuan-3-4-role-realtime-perf-deploy', 'Tuần 3.4: Role-based + Real-time + Performance', [
      ['Role-based Rendering, Middleware', 'Role-based rendering: concept và middleware.'],
      ['Admin vs User UI Implementation', 'Admin vs user UI implementation.'],
      ['SSE Setup', 'Server-Sent Events (SSE) setup.'],
      ['Real-time Metrics, SSE/Saga Polling', 'Real-time metrics: SSE và Saga polling.'],
      ['Web Performance, CRP, HTTP Caching', 'Tối ưu web: CRP, HTTP caching, font/image.'],
      ['Performance Budget, LoAF API', 'Performance Budget và LoAF API.'],
      ['Review, Polish, Docs — P3 Complete', 'Review, polish và docs cho Project 3.'],
    ]],
  ]],
  ['thang-4-realtime-animation-social', 'Tháng 4: Real-time + Animation + Project 4', [
    ['tuan-4-1-websocket-realtime-git', 'Tuần 4.1: WebSockets + Real-time + Git Advanced', [
      ['Socket.io Client, Connection, Events', 'Socket.io client: connection và events.'],
      ['Socket.io Rooms, Namespaces', 'Socket.io: rooms và namespaces.'],
      ['Real-time Feed, New Post', 'Real-time feed: hiển thị new post.'],
      ['Real-time Feed, Live Comment', 'Real-time feed: live comment.'],
      ['Optimistic Update, TanStack Query Setup', 'Optimistic update concept và TanStack Query setup.'],
      ['Implement Optimistic Update cho Feed', 'Implement optimistic update cho social feed.'],
      ['Git Advanced, Cherry-pick, Reflog, Bisect', 'Git advanced: cherry-pick, reflog, bisect.'],
    ]],
    ['tuan-4-2-animation-performance', 'Tuần 4.2: Animation + Performance', [
      ['Framer Motion, Enter/Exit Animation', 'Framer Motion: enter/exit animation.'],
      ['Framer Motion, Layout Animation, Gestures', 'Framer Motion: layout animation và gestures.'],
      ['Animation 60fps, will-change, transform', 'Animation 60fps: will-change và transform optimization.'],
      ['Optimize Animation Thực tế', 'Optimize animation trong production.'],
      ['Infinite Scroll, Intersection Observer', 'Infinite scroll với Intersection Observer.'],
      ['Implement Infinite Scroll cho Feed', 'Implement infinite scroll cho social feed.'],
      ['Image Lazy Loading', 'Image lazy loading optimization.'],
    ]],
    ['tuan-4-3-upload-workers-storage', 'Tuần 4.3: File Upload + Web Workers + Storage', [
      ['Drag-drop Upload', 'Drag-drop file upload cơ bản.'],
      ['Image Preview', 'Image preview trước khi upload.'],
      ['Upload Progress, XHR/fetch', 'Upload progress với XHR/fetch progress event.'],
      ['Cancel Upload', 'Cancel upload functionality.'],
      ['Web Workers, Image Compression', 'Web Workers cho image compression.'],
      ['Web Workers, CSV Parse', 'Web Workers cho CSV parse.'],
      ['Web APIs Storage, IndexedDB, Broadcast Channel', 'Web APIs: IndexedDB và Broadcast Channel.'],
    ]],
    ['tuan-4-4-seo-deploy', 'Tuần 4.4: SEO Dynamic + Deploy', [
      ['Dynamic Meta Tags cho Post', 'Dynamic meta tags cho từng post.'],
      ['Implement Dynamic Meta Tags', 'Implement dynamic meta tags.'],
      ['OG Image Generation @vercel/og', 'OG image generation với @vercel/og.'],
      ['Implement OG Image cho Post', 'Implement OG image generation cho từng post.'],
      ['Deploy Vercel', 'Deploy frontend lên Vercel.'],
      ['Deploy Railway cho WebSocket', 'Deploy WebSocket server lên Railway.'],
      ['Review, Polish — P4 Complete', 'Review, polish cho Project 4.'],
    ]],
  ]],
  ['thang-5-ui-engineering-design-system', 'Tháng 5: UI Engineering + Project 5', [
    ['tuan-5-1-design-tokens-primitives', 'Tuần 5.1: Design Tokens + Component Primitives', [
      ['Design Tokens, Primitive to Semantic', 'Design tokens: primitive → semantic token.'],
      ['Design Tokens, Component-level', 'Design tokens: component-level tokens.'],
      ['Style Dictionary Setup', 'Style Dictionary setup và configuration.'],
      ['Style Dictionary Export CSS, JS, iOS, Android', 'Style Dictionary: export multi-platform.'],
      ['Radix UI Primitives, Dialog, Select', 'Radix UI primitives: Dialog và Select.'],
      ['Radix UI Primitives, Tabs', 'Radix UI primitives: Tabs và các primitive khác.'],
      ['Accessibility, Focus Trap, Roving Tabindex', 'Accessibility patterns: focus trap, roving tabindex.'],
    ]],
    ['tuan-5-2-custom-components', 'Tuần 5.2: Custom Components', [
      ['Combobox, Autocomplete', 'Custom Combobox: autocomplete functionality.'],
      ['Combobox, Keyboard Navigation', 'Custom Combobox: keyboard navigation.'],
      ['Date Picker, Accessible Base', 'Custom Date Picker: accessible base.'],
      ['Date Picker, i18n', 'Custom Date Picker: i18n support.'],
      ['Data Grid, Sort', 'Custom Data Grid: sort functionality.'],
      ['Data Grid, Filter', 'Custom Data Grid: filter functionality.'],
      ['Data Grid, Virtual Scroll', 'Custom Data Grid: virtual scroll.'],
    ]],
    ['tuan-5-3-storybook-chromatic-publish', 'Tuần 5.3: Storybook + Chromatic + Publish', [
      ['Storybook MDX Docs, Controls', 'Storybook setup: MDX docs và controls.'],
      ['Storybook Actions Addon', 'Storybook: actions addon.'],
      ['Chromatic Visual Regression', 'Chromatic visual regression testing.'],
      ['Chromatic Review Workflow', 'Chromatic review workflow.'],
      ['Package Publish, npm/GitHub Packages', 'Package publish: npm/GitHub Packages setup.'],
      ['Semantic Versioning', 'Semantic versioning cho component library.'],
      ['Publish + Test Install', 'Publish thực tế và test install.'],
    ]],
    ['tuan-5-4-polish-docs-war-stories', 'Tuần 5.4: Polish + Documentation + War Stories', [
      ['Dark Mode Tokens Concept', 'Dark mode tokens: concept và thiết kế.'],
      ['Dark Mode Tokens Implementation', 'Dark mode tokens: implement across components.'],
      ['Animation Tokens Concept', 'Animation tokens: concept và thiết kế.'],
      ['Animation Tokens, Micro-interactions', 'Animation tokens: micro-interactions implementation.'],
      ['Contribution Guide', 'Viết contribution guide cho design system.'],
      ['Migration Guide', 'Viết migration guide cho design system.'],
      ['War Stories Practice — P5 Complete', 'Practice war stories và hoàn thành Project 5.'],
    ]],
  ]],
  ['thang-6-legacy-migration-portfolio', 'Tháng 6: Legacy Migration + Portfolio', [
    ['tuan-6-1-migration-strategy', 'Tuần 6.1: Migration Strategy', [
      ['Strangler Fig Pattern', 'Strangler Fig Pattern: lý thuyết migration.'],
      ['Migration Plan, Feature-by-Feature', 'Lên kế hoạch migrate từng feature.'],
      ['Web Components, Custom Element', 'Web Components: custom element cơ bản.'],
      ['Wrap React as Custom Element', 'Wrap React component thành custom element.'],
      ['iframe Embedding', 'iframe embedding strategy.'],
      ['postMessage Communication', 'postMessage communication giữa iframe.'],
      ['jQuery Interop', 'jQuery interop: gọi plugin từ React, cleanup.'],
    ]],
    ['tuan-6-2-implement-migration', 'Tuần 6.2: Implement Migration', [
      ['Setup jQuery App', 'Setup jQuery app cho migration demo.'],
      ['Setup React App Song Song', 'Setup React app chạy song song jQuery.'],
      ['Migrate User Profile UI', 'Migrate user profile: phần UI.'],
      ['Migrate User Profile Logic', 'Migrate user profile: phần logic.'],
      ['Web Component Wrapper', 'Thiết kế và implement Web Component wrapper.'],
      ['Embed React trong jQuery', 'Implement embed React components trong jQuery.'],
      ['Integration Testing', 'Test tích hợp jQuery + React.'],
    ]],
    ['tuan-6-3-portfolio', 'Tuần 6.3: Tổng hợp Portfolio', [
      ['README chi tiết Project 1-3', 'Viết README chi tiết cho project 1-3.'],
      ['README chi tiết Project 4-6', 'Viết README chi tiết cho project 4-6.'],
      ['Portfolio Site Setup, Layout', 'Portfolio site: setup và layout.'],
      ['Integrate 6 Projects vào Portfolio', 'Tích hợp 6 project vào portfolio site.'],
      ['Video Demo Project 1-2', 'Quay video demo project 1-2.'],
      ['Video Demo Project 3-4', 'Quay video demo project 3-4.'],
      ['Video Demo Project 5-6', 'Quay video demo project 5-6.'],
    ]],
    ['tuan-6-4-apply-job', 'Tuần 6.4: Apply Job', [
      ['Ôn tập Event Loop, Fiber, Caching', 'Ôn tập Event Loop, Fiber và Caching.'],
      ['Ôn tập Security', 'Ôn tập Security cơ bản cho phỏng vấn.'],
      ['Live Code Practice, Modal, Dropdown', 'Live code practice: Modal, Dropdown, Data Table.'],
      ['Frontend System Design Practice RADIO', 'Frontend System Design practice với RADIO framework.'],
      ['Apply Job Batch 1', 'Apply 5+ job Senior Frontend.'],
      ['Apply Job Batch 2', 'Apply thêm 5+ job Senior Frontend.'],
      ['Review, Iterate — Portfolio Complete', 'Review, iterate và hoàn thành portfolio.'],
    ]],
  ]],
];

// Generate files
let globalOrder = 100;
let totalFiles = 0;
const sidebarItems = [];

for (const [monthSlug, monthLabel, weeks] of months) {
  const monthItems = [];

  for (const [weekSlug, weekLabel, days] of weeks) {
    const weekDir = path.join(BASE, monthSlug, weekSlug);
    fs.mkdirSync(weekDir, { recursive: true });

    const weekItems = [];
    let dayInWeek = 0;

    for (const [dayTitle, dayDesc] of days) {
      dayInWeek++;
      globalOrder++;
      totalFiles++;

      const daySlug = `ngay-${String(dayInWeek).padStart(2, '0')}-${slugify(dayTitle).slice(0, 50)}`;
      const filePath = path.join(weekDir, `${daySlug}.mdx`);

      const frontmatter = `---
title: "${dayTitle}"
description: "${dayDesc}"
sidebar:
  order: ${globalOrder}
  badge:
    text: Chưa học
    variant: note
---
`;
      fs.writeFileSync(filePath, frontmatter);

      const link = `/${path.join('block-1-master-frontend', monthSlug, weekSlug, daySlug)}/`;
      weekItems.push(`            { label: 'Ngày ${dayInWeek}: ${dayTitle.split(',')[0]}', link: '${link}' }`);
    }

    monthItems.push(`          {
            label: '${weekLabel}',
            collapsed: true,
            items: [
${weekItems.join(',\n')}
            ],
          }`);
  }

  sidebarItems.push(`        {
          label: '${monthLabel}',
          collapsed: true,
          items: [
${monthItems.join(',\n')}
          ],
        }`);
}

// Write sidebar snippet
const sidebarSnippet = `// === LỘ TRÌNH CHI TIẾT (${totalFiles} files) ===
${sidebarItems.join(',\n')}`;

fs.writeFileSync('scripts/sidebar-roadmap-snippet.js', sidebarSnippet);

console.log(`✅ Created ${totalFiles} MDX files`);
console.log(`📁 Sidebar snippet saved to scripts/sidebar-roadmap-snippet.js`);
console.log(`📋 Copy the snippet into astro.config.mjs sidebar items`);
