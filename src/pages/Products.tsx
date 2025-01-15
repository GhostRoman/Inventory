import {useState} from 'react';
import {Product} from '../types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import 'animate.css';

// Компонент для отображения и управления списком продуктов
export default function Products() {
  // Определение состояний для типа продукта, строки поиска, порядка сортировки и списка продуктов
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [products, setProducts] = useState<Product[]>([
    // Примеры продуктов
    {
      id: '1',
      name: 'Gigabyte Technology X58-USB3',
      type: 'Monitor',
      status: 'available',
      warrantyStart: new Date(),
      warrantyEnd: new Date(2025, 7, 6),
      price: 250000.5,
      serialNumber: 'SN-12-3456789',
      image: 'https://content2.rozetka.com.ua/goods/images/big/456931948.jpg'
    },
    {
      id: '2',
      name: 'Apple MacBook Pro 16"',
      type: 'Laptop',
      status: 'available',
      warrantyStart: new Date(),
      warrantyEnd: new Date(2026, 5, 15),
      price: 320000,
      serialNumber: 'SN-45-9876543',
      image: 'https://content2.rozetka.com.ua/goods/images/big/485311834.jpg'
    },
    {
      id: '3',
      name: 'Samsung Galaxy S23 Ultra',
      type: 'Smartphone',
      status: 'available',
      warrantyStart: new Date(),
      warrantyEnd: new Date(2025, 11, 30),
      price: 45000.75,
      serialNumber: 'SN-89-1122334',
      image: 'https://content.rozetka.com.ua/goods/images/large/473822717.jpg'
    },
    {
      id: '4',
      name: 'Sony WH-1000XM4 Headphones',
      type: 'Headphones',
      status: 'in_repair',
      warrantyStart: new Date(),
      warrantyEnd: new Date(2024, 9, 20),
      price: 12000.99,
      serialNumber: 'SN-77-5566778',
      image: 'https://content1.rozetka.com.ua/goods/images/big/29129111.jpg'
    },
    {
      id: '5',
      name: 'Logitech MX Master 3 Mouse',
      type: 'Accessories',
      status: 'available',
      warrantyStart: new Date(),
      warrantyEnd: new Date(2025, 3, 10),
      price: 3500,
      serialNumber: 'SN-66-3344556',
      image: 'https://content2.rozetka.com.ua/goods/images/big/361180466.png'
    }
  ]);

  // Определение состояния для модального окна и нового продукта
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    name: '',
    type: '',
    status: 'available',
    warrantyStart: new Date(),
    warrantyEnd: new Date(),
    price: 0,
    serialNumber: '',
    image: ''
  });

  // Сортировка и фильтрация продуктов на основе состояния
  const sortedProducts = [...products].sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
  const filteredProducts = sortedProducts.filter(product =>
      (selectedType === 'all' || product.type === selectedType) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Обработка добавления нового продукта
  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now().toString() }]);
    setIsModalOpen(false);
    setNewProduct({
      id: '',
      name: '',
      type: '',
      status: 'available',
      warrantyStart: new Date(),
      warrantyEnd: new Date(),
      price: 0,
      serialNumber: '',
      image: ''
    });
  };

  return (
      <div className="flex-1 bg-gray-50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Продукты / {filteredProducts.length}</h1>
          <div className="flex gap-4 items-center">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Добавить продукт
            </button>
            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border rounded-lg px-4 py-2 text-sm"
            >
              {['all', ...new Set(products.map(p => p.type))].map(type => (
                  <option key={type} value={type}>{type === 'all' ? 'Все' : type}</option>
              ))}
            </select>
            <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-lg px-4 py-2 text-sm w-48"
            />
            <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="bg-gray-300 px-4 py-2 rounded-lg text-sm"
            >
              Сортировать по цене ({sortOrder === 'asc' ? '↑' : '↓'})
            </button>
          </div>
        </div>
        <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
              <CSSTransition key={product.id} timeout={500} classNames="animate__animated animate__fadeIn">
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                  <img
                      src={product.image}
                      alt={product.name}
                      className="h-40 object-contain mx-auto mb-4"
                  />
                  <h2 className="mt-4 text-xl font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.type}</p>
                  <p className={`text-sm ${product.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                    {product.status === 'available' ? 'Доступен' : 'В ремонте'}
                  </p>
                  <p className="text-sm">Гарантия до: {product.warrantyEnd.toLocaleDateString()}</p>
                  <p className="font-semibold">Цена: {product.price.toLocaleString()} UAH</p>
                  <p className="text-sm">Серийный номер: {product.serialNumber}</p>
                </div>
              </CSSTransition>
          ))}
        </TransitionGroup>
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Добавить продукт</h2>
                <input
                    placeholder="Название"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full border mb-2 px-3 py-2 rounded-lg"
                />
                <input
                    placeholder="Тип"
                    value={newProduct.type}
                    onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                    className="w-full border mb-2 px-3 py-2 rounded-lg"
                />
                <input
                    placeholder="Цена"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    className="w-full border mb-2 px-3 py-2 rounded-lg"
                />
                <button
                    onClick={handleAddProduct}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-4"
                >
                  Добавить
                </button>
              </div>
            </div>
        )}
      </div>
  );
}
