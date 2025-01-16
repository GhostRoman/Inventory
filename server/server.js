import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

let activeSessions = 0;

io.on('connection', (socket) => {
    activeSessions++;
    io.emit('activeSessions', activeSessions); // Отправка количества сессий

    socket.on('disconnect', () => {
        activeSessions--;
        io.emit('activeSessions', activeSessions); // Обновление при отключении
    });
});

server.listen(3001, () => {
    console.log('Socket.io сервер запущен на порту 3000');
});
