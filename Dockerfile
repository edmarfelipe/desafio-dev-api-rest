FROM node:17.2-alpine3.12 AS builder
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm ci \
    && npm run build \
    && npm prune --production

FROM node:17.2-alpine3.12

RUN apk add dumb-init
ENV NODE_ENV production

USER node

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY --from=builder /usr/src/app/dist/ /usr/src/app/dist/

EXPOSE 3000
CMD ["dumb-init", "node", "dist/main"]
