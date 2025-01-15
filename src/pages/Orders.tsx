import {useState} from 'react';
import {format} from 'date-fns';
import {ChevronRight, Search, Trash2, X} from 'lucide-react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Receipt} from '../types';
import DeleteConfirmation from '../components/DeleteConfirmation';
import 'animate.css';

// Компонент для управления заказами
export default function Orders() {
  // Определение состояний для выбранного и удаляемого чека, строки поиска и списка чеков
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [deleteReceipt, setDeleteReceipt] = useState<Receipt | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [receipts, setReceipts] = useState<Receipt[]>([
    // Примеры чеков
    {
      id: '1',
      name: 'Receipt 001',
      createdAt: new Date(),
      totalAmount: 250000.50,
      products: [
        {
          id: '1',
          name: 'Gigabyte Technology X58-USB3',
          type: 'Monitor',
          status: 'available',
          warrantyStart: new Date(),
          warrantyEnd: new Date(2025, 7, 6),
          price: 250000.50,
          serialNumber: 'SN-12-3456789',
          image: 'https://content2.rozetka.com.ua/goods/images/big/45320527.jpg'
        },
        {
          id: '2',
          name: 'Apple MacBook Pro 16"',
          type: 'Laptop',
          status: 'available',
          warrantyStart: new Date(),
          warrantyEnd: new Date(2026, 5, 15),
          price: 320000.00,
          serialNumber: 'SN-45-9876543',
          image: 'https://content2.rozetka.com.ua/goods/images/big/485311834.jpg'
        }
      ]
    },
    {
      id: '2',
      name: 'Receipt 002',
      createdAt: new Date(),
      totalAmount: 45000.75,
      products: [
        {
          id: '3',
          name: 'Samsung Galaxy S23 Ultra',
          type: 'Smartphone',
          status: 'available',
          warrantyStart: new Date(),
          warrantyEnd: new Date(2025, 11, 30),
          price: 45000.75,
          serialNumber: 'SN-89-1122334',
          image: 'https://content.rozetka.com.ua/goods/images/big/473822717.jpg'
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
        }
      ]
    }
  ]);

  // Удаление чека
  const handleDelete = (receipt: Receipt) => {
    setDeleteReceipt(receipt);
  };

  const confirmDelete = () => {
    if (deleteReceipt) {
      setReceipts((prevReceipts) =>
          prevReceipts.filter((receipt) => receipt.id !== deleteReceipt.id)
      );
    }
    setDeleteReceipt(null);
  };

  // Фильтрация чеков на основе строки поиска
  const filteredReceipts = receipts.filter(receipt =>
      receipt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.products.some(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
      <div className="flex-1 bg-gray-50 p-6 flex flex-col lg:flex-row">
        {/* Панель слева: список заказов */}
        <div className="w-full lg:w-2/3 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Заказы / {filteredReceipts.length}</h1>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск заказов"
                  className="border rounded-lg px-4 py-2 focus:outline-none"
              />
              <button type="submit" className="text-gray-600 hover:text-gray-800">
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Список чеков */}
          <TransitionGroup>
            {filteredReceipts.map((receipt) => (
                <CSSTransition key={receipt.id} timeout={500} classNames="animate__animated animate__fadeIn">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <div
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedReceipt(selectedReceipt === receipt ? null : receipt.id)}
                    >
                      <div className="flex items-center gap-4">
                        <ChevronRight size={20} className={`transform transition-transform ${selectedReceipt === receipt.id ? 'rotate-90' : ''}`} />
                        <div>
                          <h3 className="font-medium">{receipt.name}</h3>
                          <p className="text-sm text-gray-500">{receipt.products.length} products</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <div>{format(receipt.createdAt, 'dd/MM/yyyy')}</div>
                          <div className="text-sm text-gray-500">{format(receipt.createdAt, 'dd MMM yyyy')}</div>
                        </div>
                        <div>
                          <div>${receipt.totalAmount.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">{(receipt.totalAmount * 30).toFixed(2)} UAH</div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(receipt); }} className="p-2 hover:bg-gray-100 rounded-lg">
                          <Trash2 size={20} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
            ))}
          </TransitionGroup>
        </div>

        {/* Панель справа: детали заказа */}
        {selectedReceipt && (
            <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6 ml-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Детали заказа</h2>
                <button onClick={() => setSelectedReceipt(null)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {filteredReceipts
                    .find((receipt) => receipt.id === selectedReceipt)
                    ?.products.map((product) => (
                        <div key={product.id} className="flex items-center gap-4">
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover" />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.serialNumber}</div>
                          </div>
                        </div>
                    ))}
              </div>
            </div>
        )}

        {/* Модальное окно подтверждения удаления */}
        {deleteReceipt && (
            <DeleteConfirmation
                title="Удаление заказа"
                itemDetails={`Вы уверены что хотите удалить этот заказ?`}
                products={deleteReceipt.products.map((product) => ({
                  id: product.id,
                  name: product.name,
                  serialNumber: product.serialNumber,
                  image: product.image
                }))}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteReceipt(null)}
            />
        )}
      </div>
  );
}
