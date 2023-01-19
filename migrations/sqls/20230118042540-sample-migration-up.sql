/* Replace with your SQL commands */
CREATE TABLE books(id SERIAL PRIMARY KEY, title VARCHAR(100), author VARCHAR(50), total_pages INTEGER, type VARCHAR(50), summary text);
INSERT INTO books(title, author, total_pages, type, summary) VALUES ('Bridge to Terabithia', 'Katherine Paterson', 208, 'childrens', 'A good book');
