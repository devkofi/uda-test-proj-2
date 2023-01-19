/* Replace with your SQL commands */
CREATE TABLE books(id SERIAL PRIMARY KEY, title VARCHAR(100), author VARCHAR(50), total_pages INTEGER, type VARCHAR(50), summary text);
INSERT INTO books(title, author, total_pages, type, summary) VALUES ('Bridge to Terabithia', 'Katherine Paterson', 208, 'childrens', 'A good book');
CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), password password);
INSERT INTO users(name, email, password) VALUES ('Zeroit Dev', 'zeroitdev@gmail.com', '1234567890');