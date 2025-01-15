// Интерфейс товара
export interface Product {
  image: string;  // Изображение товара
  id: string;  // Уникальный идентификатор
  name: string;  // Название
  type: string;  // Тип
  status: 'available' | 'in_repair' | 'reserved';  // Статус
  warrantyStart: Date;  // Начало гарантии
  warrantyEnd: Date;  // Конец гарантии
  price: number;  // Цена
  serialNumber: string;  // Серийный номер
  receiptId?: string;  // Идентификатор чека (опционально)
}

// Интерфейс чека
export interface Receipt {
  id: string;  // Уникальный идентификатор
  name: string;  // Название
  products: Product[];  // Список товаров
  createdAt: Date;  // Дата создания
  totalAmount: number;  // Общая сумма
}
