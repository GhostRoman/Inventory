import {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {io} from 'socket.io-client';
import {Users} from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

export default function TopMenu() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSessions, setActiveSessions] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const socket = io('https://inventory-q784.onrender.com', {
      transports: ['websocket'],
    });

    socket.on('activeSessions', (count) => {
      setActiveSessions(count);
    });

    socket.on('connect_error', (err) => {
      console.error('Ошибка подключения:', err);
    });

    return () => {
      clearInterval(timer);
      socket.disconnect();
    };
  }, []);

  return (
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
            <Users size={20} />
            <span>{activeSessions} Активные сессии</span>
          </div>
          <div className="text-gray-600 dark:text-gray-200">
            {format(currentTime, 'dd MMM, yyyy')} {format(currentTime, 'HH:mm')}
          </div>
        </div>
        <ThemeSwitcher /> {/* Переключатель тем */}
      </div>
  );
}
