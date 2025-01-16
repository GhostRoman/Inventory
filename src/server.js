// server.js
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Настройка CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

// Инициализация Socket.io
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost'],
        methods: ['GET', 'POST'],
        credentials: true,
        transports: ['websocket', 'polling'],
    },
});

let activeSessions = 0;

io.on('connection', (socket) => {
    console.log(`Пользователь подключился: ${socket.id}`);
    activeSessions++;
    io.emit('activeSessions', activeSessions);

    socket.on('disconnect', () => {
        console.log(`Пользователь отключился: ${socket.id}`);
        activeSessions = Math.max(activeSessions - 1, 0);
        io.emit('activeSessions', activeSessions);
    });
});

// Прокси для обхода CORS
app.use('/api', (req, res) => {
    const url = 'https://dlnk.one' + req.url;
    fetch(url, {
        method: req.method,
        headers: { 'Content-Type': 'application/json' },
        body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    })
        .then(response => response.text())
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err.message));
});

// Раздача статических файлов
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
