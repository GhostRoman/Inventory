-- Создание базы данных
CREATE DATABASE IF NOT EXISTS InventoryDB;
USE InventoryDB;

-- Создание таблицы Products
CREATE TABLE IF NOT EXISTS Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    status ENUM('available', 'in_repair') NOT NULL,
    warrantyStart DATE NOT NULL,
    warrantyEnd DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    serialNumber VARCHAR(255) NOT NULL UNIQUE,
    image VARCHAR(255) NOT NULL
);

-- Создание таблицы Receipts
CREATE TABLE IF NOT EXISTS Receipts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL
);

-- Создание таблицы для связи квитанций и продуктов (многие ко многим)
CREATE TABLE IF NOT EXISTS ReceiptProducts (
    receipt_id INT,
    product_id INT,
    FOREIGN KEY (receipt_id) REFERENCES Receipts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE,
    PRIMARY KEY (receipt_id, product_id)
);
