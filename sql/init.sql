CREATE DATABASE IF NOT EXISTS fireentity_space
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'fireentity'@'127.0.0.1' IDENTIFIED BY 'fireentity';
GRANT ALL PRIVILEGES ON fireentity_space.* TO 'fireentity'@'127.0.0.1';
FLUSH PRIVILEGES;
