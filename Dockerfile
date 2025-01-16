# Используем Node.js как базовый образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости, включая optional dependencies
RUN npm install --optional

# Копируем остальные файлы приложения
COPY . .

# Собираем фронтенд часть
RUN npm run build

# Устанавливаем порт, который будет использовать контейнер
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
