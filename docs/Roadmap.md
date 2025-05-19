# Roadmap

## Business Features

- [x] Car listing with filters
- [x] Car detail page
- [x] Car booking
- [x] User profile dashboard
- [ ] User profile edit
- [x] User profile settings
- [x] Real-time notifications
- [ ] Chat with AI support bot

## Performance Optimization

- [x] Implement **code splitting** & lazy loading for routes and components
- [ ] Optimize **initial load time** by reducing bundle size (e.g., tree shaking, ESBuild optimizations)
- [x] Optimize images with **modern formats** (WebP, AVIF) and lazy loading
- [ ] Reduce render-blocking resources with **preloading & prefetching** strategies
- [ ] Add **server-side rendering (SSR) and static site generation (SSG)** for better SEO & performance
- [ ] Use **service workers** for caching assets and improving offline support

## State Management & API Optimization

- [ ] Use **caching strategies** (e.g., SWR, local storage, indexedDB) to reduce redundant API calls
- [x] Use **WebSockets or SSE** for real-time data updates instead of frequent polling

## Accessibility & UX

- [ ] Improve **keyboard navigation** and ensure all interactive elements are accessible
- [ ] Ensure full **WCAG compliance** (color contrast, screen reader support, semantic HTML)
- [x] Add **skeleton loaders** for better perceived performance on slow connections
- [x] Implement **dark mode** based on user preferences
- [x] Implement i18n
- [ ] Implement a11y standards

## Progressive Web App (PWA) Enhancements

- [ ] Enable **PWA support** with service workers & offline caching
- [ ] Implement **background sync** for offline-first capabilities
- [ ] Add an **installable web app prompt**

## Scalability & Reliability

- [ ] Error handling & logging with structured logs
- [ ] Add error tracking, alerts, health checks, metrics

## Code Quality & Maintainability

- [x] Set up **strict TypeScript rules** for better type safety
- [x] Follow FSD principles for better **modularity & scalability**
- [ ] Add **unit & integration tests** using Vitest or Jest
- [ ] Set up **end-to-end tests** with Cypress or Playwright
- [x] Implement **automatic code linting & formatting** with ESLint & Prettier

## Deployment & DevOps

- [x] Add **Docker image** build
- [x] Set up **automatic deployments** with CI/CD pipelines
- [ ] Implement **feature flags** to control experimental features
