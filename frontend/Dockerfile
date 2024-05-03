FROM node:20.9.0-alpine3.17

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY src ./src
COPY public ./public
COPY tsconfig.json ./tsconfig.json
COPY next-env.d.ts ./next-env.d.ts
COPY .env ./.env
COPY *.config.ts ./
COPY *.config.js ./
COPY postcss.config.mjs ./postcss.config.mjs
COPY components.json ./components.json

CMD npm run dev