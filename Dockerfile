# Используем официальный Node.js образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Собираем фронтенд
WORKDIR /app
RUN npm run build

# Открываем порты для фронтенда и бэкенда
EXPOSE 3000 5000

# Запускаем сервер
CMD ["node", "server.js"]
