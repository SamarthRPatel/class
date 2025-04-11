-- Create Database
CREATE DATABASE real_estate_db;
USE real_estate_db;

-- Table: Users (Stores buyer & seller details)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    user_type ENUM('buyer', 'seller') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Properties (Stores all property listings)
CREATE TABLE properties (
    property_id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    property_type ENUM('apartment', 'house', 'condo') NOT NULL,
    image_url VARCHAR(255),  -- Store image path
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table: Favorites (Stores user’s saved properties)
CREATE TABLE favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE
);

-- Table: Inquiries (Stores buyer inquiries to sellers)
CREATE TABLE inquiries (
    inquiry_id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    property_id INT NOT NULL,
    message TEXT NOT NULL,
    inquiry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE
);

-- Table: Contacts (Stores contact requests sent to sellers)
CREATE TABLE contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    seller_id INT NOT NULL,
    property_id INT NOT NULL,
    message TEXT NOT NULL,
    contact_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE
);

-- Insert Sample Users
INSERT INTO users (name, email, phone, password, user_type) VALUES
('John Doe', 'john@example.com', '1234567890', 'hashedpassword1', 'buyer'),
('Sarah Smith', 'sarah@example.com', '0987654321', 'hashedpassword2', 'seller');

-- Insert Sample Properties
INSERT INTO properties (seller_id, title, description, location, price, property_type, image_url) VALUES
(2, 'Luxury Apartment in Downtown', 'Spacious 2BHK with lake view', 'Downtown', 550000, 'apartment', 'img1.jpg'),
(2, 'Modern House in Cote-Vertu', '3BHK house with garden', 'Cote-Vertu', 450000, 'house', 'img2.jpg'),
(2, 'Penthouse in Angrignon', 'Luxury condo with city view', 'Angrignon', 800000, 'condo', 'img3.jpg');

-- Insert Sample Favorites
INSERT INTO favorites (user_id, property_id) VALUES
(1, 1),
(1, 2);

-- Insert Sample Inquiries
INSERT INTO inquiries (buyer_id, property_id, message) VALUES
(1, 1, 'I am interested in this property. Can we discuss the price?');

-- Insert Sample Contact Requests
INSERT INTO contacts (buyer_id, seller_id, property_id, message) VALUES
(1, 2, 1, 'I want to schedule a visit.');
