FROM node:22-alpine as builder

ARG NEXT_PUBLIC_BETTER_AUTH_URL=$NEXT_PUBLIC_BETTER_AUTH_URL
ARG NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Set the working directory inside the container
WORKDIR /app

COPY bun.lock .
COPY package.json .
RUN bun install
COPY . .
RUN bun run build

FROM node:22-alpine as runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/bun.lock .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/next.config.ts .

EXPOSE 3000

ENTRYPOINT [ "node" , "server.js" ]
