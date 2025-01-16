# Сборка фронтенда
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Серверная часть
FROM node:18

WORKDIR /app

# Копируем сервер и собранный фронтенд
COPY server.js server.js
COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./
RUN npm install --only=production

EXPOSE 3000

CMD ["node", "server.js"]

