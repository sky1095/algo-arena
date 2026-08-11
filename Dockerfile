# syntax=docker/dockerfile:1

# Algo Arena — self-hosted build.
# The image bakes in every runtime the judge needs (Python, Deno for JS/TS,
# Java, C++), so all 5 languages work out of the box.

FROM node:24-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1

# --- Dependencies ---------------------------------------------------------
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Build -----------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Runtime ----------------------------------------------------------------
FROM base AS runner
# Judge runtimes: python3, deno (JS/TS), openjdk JDK (javac/java), g++/gcc.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        python3 \
        g++ \
        gcc \
        openjdk-17-jdk-headless \
        curl \
        unzip \
    && curl -fsSL https://deno.land/install.sh | DENO_INSTALL=/usr/local sh -s -- --yes \
    && rm -rf /var/lib/apt/lists/* \
    # Dedicated unprivileged user for judge processes: submissions run as
    # `judge` (never root), so they cannot read /app/data or anything else.
    && groupadd -g 1001 judge \
    && useradd -u 1001 -g 1001 -s /usr/sbin/nologin --no-create-home judge

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV DB_PATH=/app/data/app.db
ENV JUDGE_UID=1001
ENV JUDGE_GID=1001

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./
RUN mkdir -p data

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
