# fe-app-web (Frontend)

This repository contains the frontend of fe-app project, a production-grade car rental service. The project showcases
modern JavaScript development practices with a focus on scalability, maintainability, and performance. It follows
a loosely implemented Feature Sliced Design (FSD) architecture.

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Code Structure](#code-structure)
- [API Integration](#api-integration)
- [WebSocket Integration][(#websocket-integration)]
- [Deployment](#deployment)
- [Running Locally](#running-locally)
- [Roadmap](./docs/Roadmap.md)
- [Changelog](./CHANGELOG.md)

## Overview

**fe-app** is a full-featured and production-ready car rental service, designed to showcase modern JavaScript
development across the backend, frontend, and platform infrastructure. The project integrates the latest
technologies, architectures, and best practices to deliver a scalable, maintainable, and high-performance solution.

It's not just a car rental service — it serves as a comprehensive reference for modern JavaScript development,
demonstrating:

- Best practices in full-stack development
- Seamless frontend-backend integration
- Scalable and maintainable architecture patterns
- Optimized developer experience with modern tooling

## Tech Stack

- **Runtime:** [Browser](./.browserslistrc)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [Vue 3](https://vuejs.org/)
- **Routing:** [Vue-Router](https://router.vuejs.org/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **API Client:** [Axios](https://axios-http.com/)
- **Websocket Client:** [Socket.io](https://socket.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Library:** [PrimeVue](https://www.primevue.org/)
- **Maps API:** [OSM](https://www.openstreetmap.org/) with [Leaflet](https://leafletjs.com/)
- **Form Validation:** [Vee-Validate](https://vee-validate.logaretm.com/) with [Zod](https://zod.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Deployment:** [Render](https://render.com/)

## Code Structure

The frontend follows a loosely implemented **Feature Sliced Design (FSD)** approach:

```
📦 fe-app-web
 ┣ 📂 src
 ┃ ┣ 📂 app          # App's related code (styles, providers, routing, etc.)
 ┃ ┣ 📂 pages        # Route-based components
 ┃ ┣ 📂 widgets      # Self-contained chunks of functionality or UI, usually delivering an entire use case
 ┃ ┣ 📂 entities     # Domain models and API interactions
 ┃ ┣ 📂 shared       # Reusable UI components, utilities, helpers
 ┃ ┣ 📜 app.ts       # App setup
 ┃ ┣ 📜 entry.ts     # Entry point
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┗ 📜 README.md
```

## API Integration

- API client is generated via [`@hey-api/openapi-ts`](https://heyapi.dev/), ensuring type safety and automatic updates when backend specifications change.
- Requests are made using **Axios**, with interceptors for authentication and error handling.

## WebSocket Integration

The frontend establishes real-time WebSocket connections with the backend using **Socket.IO**. These connections powers live features such as car status, booking changes or user session sync — without needing manual refreshes.
This architecture allows low-latency communication between client and server, and is designed to scale using an Event-Driven Architecture (EDA) with the backend emitting events based on business logic triggers.

## Deployment

The frontend is containerized and deployed via **Render**.

### Build & Deployment Steps:

1. **Build Docker Image:**
   ```sh
   docker build -t fe-app-web .
   ```
2. **Run Locally with Docker:**
   ```sh
   docker run -p 3000:3000 --env-file .env fe-app-web
   ```
3. **Deploy to Render:**
   - Render automatically builds and deploys the image from the repository.
   - Uses a **proxy** to handle incoming requests.

## Running Locally

### Prerequisites:

- [Node.js](https://nodejs.org/) & [pnpm](https://pnpm.io/)

### Steps:

1. **Install dependencies:**
   ```sh
   pnpm install
   ```
2. **Set up environment variables:** (create a `.env` file)
   ```env
   API_PATH=/api
   API_PROXY=http://localhost:4000
   API_JSON=http://localhost:4000/docs/?json=1
   SOCKET_PATH=/socket
   SOCKET_PROXY=ws://localhost:4000
   ```
3. **Build API:**
   ```sh
   pnpm run build:api
   ```
4. **Start the development server:**
   ```sh
   pnpm run dev
   ```

---

fe-app-web © 2025 by Ramil Sharipov is licensed under CC BY-NC-ND 4.0.
