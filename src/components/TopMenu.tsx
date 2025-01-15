import {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {io} from 'socket.io-client';
import {Users} from 'lucide-react';

// Компонент верхнего меню
export default function TopMenu() {
  const [currentTime, setCurrentTime] = useState(new Date());  // Состояние для текущего времени
  const [activeSessions, setActiveSessions] = useState(0);  // Состояние для активных сессий

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);  // Обновление времени каждую секунду

    // Подключение к серверу через WebSocket
    const socket = io('http://127.0.0.1:3001', {
      transports: ['websocket'], // Прямое подключение через WebSocket
    });

    socket.on('activeSessions', (count) => {
      setActiveSessions(count);  // Обновление количества активных сессий
    });

    socket.on('connect_error', (err) => {
      console.error('Ошибка подключения:', err);  // Обработка ошибки подключения
    });

    return () => {
      clearInterval(timer);  // Очистка интервала при размонтировании компонента
      socket.disconnect();  // Отключение от WebSocket при размонтировании компонента
    };
  }, []);

  return (
      <div className="h-16 border-b border-gray-200 flex items-center justify-end px-6 bg-white">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={20} />
            <span>{activeSessions} Активные сессии</span>
          </div>
          <div className="text-gray-600">
            {format(currentTime, 'dd MMM, yyyy')} {format(currentTime, 'HH:mm')}
          </div>
        </div>
      </div>
  );
}
