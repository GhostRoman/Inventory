# 1. Базовый образ для сборки фронтенда (Vite + React)
FROM node:18-alpine AS build

# Рабочая директория
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем проект и собираем фронтенд
COPY . .
RUN npm run build

# 2. Базовый образ для запуска Node.js сервера
FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Устанавливаем зависимости только для сервера
COPY package*.json ./
RUN npm install --omit=dev

# Копируем сборку фронтенда и сервер
COPY --from=build /app/dist ./dist
COPY server.js .

# Открываем порт (сервер)
EXPOSE 3000

# Запуск сервера
CMD ["node", "server.js"]
