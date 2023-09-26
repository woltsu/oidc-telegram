FROM node:18-slim as base

RUN npm i -g pnpm

FROM base as builder

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN npm run build

FROM base

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8000
CMD [ "node", "dist/index.mjs" ]