FROM node:20.9.0-alpine3.17

WORKDIR /app

COPY ./*.json ./

RUN npm i

COPY ./.env ./
COPY ./src ./

CMD npm run dev