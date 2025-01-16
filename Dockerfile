# Базовый образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для фронтенда
COPY package*.json ./

# Устанавливаем зависимости фронтенда
RUN npm install

# Копируем фронтенд и бэкенд в контейнер
COPY . .
COPY server/package*.json ./server/

# Устанавливаем зависимости бэкенда
RUN cd server && npm install

# Открываем порты (3000 - фронт, 5000 - бэк)
EXPOSE 3000 5000

# Запускаем фронтенд и бэкенд одновременно
CMD ["npm", "start"]
