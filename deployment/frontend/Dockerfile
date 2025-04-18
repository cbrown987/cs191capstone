FROM node:20-alpine

WORKDIR /app

RUN apk add git

RUN git clone https://github.com/cbrown987/cs191capstone.git .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]