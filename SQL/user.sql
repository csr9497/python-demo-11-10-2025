
CREATE USER 'usuario_prueba'@'%' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON your_database_name.* TO 'usuario_prueba'@'172.31.15.2';
FLUSH PRIVILEGES;
