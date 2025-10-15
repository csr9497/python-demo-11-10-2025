CREATE DATABASE IF NOT EXISTS persons_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

USE persons_db;

CREATE TABLE IF NOT EXISTS persons (
  person_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  document_type INT NOT NULL,
  document_value BIGINT NULL,
  document_value_string VARCHAR(50) NULL
);
