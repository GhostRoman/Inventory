import {X} from 'lucide-react';

// Описание свойств для компонента DeleteConfirmation
interface DeleteConfirmationProps {
    title: string;  // Заголовок модального окна
    itemDetails: string;  // Подробности удаляемого элемента
    products: Array<{ id: string, name: string, serialNumber: string, image: string }>;  // Список продуктов
    onConfirm: () => void;  // Функция подтверждения удаления
    onCancel: () => void;  // Функция отмены удаления
}

// Компонент модального окна для подтверждения удаления
export default function DeleteConfirmation({
                                               title,
                                               itemDetails,
                                               products,
                                               onConfirm,
                                               onCancel,
                                           }: DeleteConfirmationProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Close confirmation"
                    >
                        <X size={20} />
                    </button>
                </div>
                <p className="text-gray-600 mb-6">{itemDetails}</p>
                <div className="space-y-4 mb-6">
                    {products.map((product) => (
                        <div key={product.id} className="flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                            <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.serialNumber}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none"
                    >
                        Отменить
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
}
