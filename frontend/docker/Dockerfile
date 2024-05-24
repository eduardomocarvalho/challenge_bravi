FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

CMD ["npx", "http-server", "dist/frontend", "-p", "4200"]
