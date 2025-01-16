# Используем официальный Node.js образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем фронтенд
WORKDIR /app
RUN npm run build

# Указываем правильный путь к серверу
CMD ["node", "src/server.js"]

# Открываем порты
EXPOSE 3000 5000
