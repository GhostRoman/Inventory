import {Link, useLocation} from 'react-router-dom';
import {Group, Package, Settings, ShieldEllipsis, ShoppingCart, Users} from 'lucide-react';
import React, {useState} from 'react';

export default function Navigation() {
  const location = useLocation();
  const [avatar, setAvatar] = useState("https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
      <nav className="h-screen w-64 bg-gray-50 border-r border-gray-200 shadow-lg flex flex-col dark:bg-gray-900 dark:border-gray-700">
        <div className="p-4">
          <div className="flex items-center gap-2 text-green-600 font-semibold text-xl">
            <ShieldEllipsis size={24} />
            <span>INVENTORY</span>
          </div>
        </div>

        <div className="flex flex-col items-center p-8">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <img
                src={avatar}
                alt="User Avatar"
                className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-md object-cover dark:border-gray-700"
            />
          </label>
          <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              aria-label="Upload Avatar"
          />
        </div>

        <div className="flex flex-col gap-4 p-4">
          <Link
              to="/orders"
              className={`flex items-center gap-2 p-2 rounded-lg ${location.pathname === '/orders' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'} dark:bg-gray-800 dark:text-gray-200`}
          >
            <ShoppingCart size={20} />
            <span>Заказы</span>
          </Link>
          <Link
              to="/groups"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
          >
            <Group size={20} />
            <span>Группы</span>
          </Link>
          <Link
              to="/products"
              className={`flex items-center gap-2 p-2 rounded-lg ${location.pathname === '/products' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'} dark:bg-gray-800 dark:text-gray-200`}
          >
            <Package size={20} />
            <span>Продукты</span>
          </Link>
          <Link
              to="/users"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
          >
            <Users size={20} />
            <span>Пользователи</span>
          </Link>
          <Link
              to="/settings"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
          >
            <Settings size={20} />
            <span>Настройки</span>
          </Link>
        </div>

        <div className="flex items-center justify-center p-4">

        </div>
      </nav>
  );
}
