FROM oven/bun:1.3 AS builder

ARG NEXT_PUBLIC_BETTER_AUTH_URL=$NEXT_PUBLIC_BETTER_AUTH_URL
ARG NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID

# Set the working directory inside the container
WORKDIR /app

COPY . .
RUN bun install
RUN bun run build

FROM oven/bun:1.3-slim AS runner
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/bun.lock .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/next.config.ts .

EXPOSE 3000

ENTRYPOINT [ "node" , "server.js" ]
