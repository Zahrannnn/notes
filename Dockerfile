# Build stage — pinned LTS Alpine base (matches .nvmrc)
FROM node:22-alpine AS builder
WORKDIR /app

# Install with the lockfile for reproducible builds
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Runtime env: the entrypoint regenerates env.js from container environment
# variables on every start, so VITE_* changes do not require a rebuild.
COPY env.sh .
RUN chmod +x env.sh

EXPOSE 80

# /bin/sh (not bash) — the nginx Alpine image ships no bash.
CMD ["/bin/sh", "-c", "./env.sh > env.js && nginx -g \"daemon off;\""]
