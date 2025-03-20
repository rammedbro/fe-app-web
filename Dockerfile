FROM --platform=linux/amd64 node:20.6.1-alpine

WORKDIR /var/www
COPY vite.config.prod.ts package.json pnpm-lock.yaml .npmrc ./
COPY build ./build
RUN corepack enable pnpm
RUN pnpm install --production --ignore-scripts
CMD pnpm start --outDir build --host $HOST --port $PORT
