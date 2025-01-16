import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Определяем __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Использование переменной окружения PORT
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://0.0.0.0:3000', 'https://ваш-домен-на-render.com'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

let activeSessions = 0;

io.on('connection', (socket) => {
    activeSessions++;
    io.emit('activeSessions', activeSessions);

    socket.on('disconnect', () => {
        activeSessions--;
        io.emit('activeSessions', activeSessions);
    });
});

// Раздача статических файлов из папки dist
app.use(express.static(path.join(__dirname, 'dist')));

// Обработка всех маршрутов
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Socket.io сервер запущен на порту ${PORT}`);
});
