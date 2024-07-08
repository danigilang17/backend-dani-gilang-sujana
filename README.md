**Marketplace API (Backend-Testing)**
API untuk marketplace merah kuning hijau, di mana merchant dapat membuat dan memposting produk, dan customer dapat membeli produk serta mendapatkan bebas ongkir dan diskon sesuai dengan kriteria yang ditentukan.

**Fitur**
Merchant dapat membuat, memperbarui, dan menghapus produk.
Customer dapat melihat daftar produk dan melakukan pembelian.
Bebas ongkir untuk transaksi di atas Rp 15.000.
Diskon 10% untuk transaksi di atas Rp 50.000.
Menggunakan JWT untuk otentikasi.
Dokumentasi API menggunakan Swagger.

**Persyaratan**
Node.js
MySQL

**Instalasi**
**1. Clone repositori ini**
git clone https://github.com/danigilang17/backend-dani-gilang-sujana.git
cd marketplace-api
**2. Instal dependensi**
npm install
**3. Konfigurasi database**
Buat database MySQL dan impor tabel-tabel yang diperlukan. Berikut adalah contoh skrip SQL untuk membuat database dan tabel:

**sql**

CREATE DATABASE marketplace;

USE marketplace;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    total_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
4. Konfigurasi file environment
Buat file .env di root directory proyek ini dan isi dengan konfigurasi berikut:

env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=marketplace
JWT_SECRET=your_jwt_secret
PORT=3000

**5. Jalankan aplikasi**
node app.js
Aplikasi sekarang berjalan di http://localhost:3000.

**Dokumentasi API**
Dokumentasi API dapat diakses melalui Swagger di http://localhost:3000/api-docs.

**Endpoints**
Auth
POST /auth/register - Register user baru
POST /auth/login - Login user

Customer
GET /customer/products - Lihat daftar produk
POST /customer/purchase - Membeli produk

Merchant
POST /merchant/products - Membuat produk baru
GET /merchant/products - Lihat daftar produk
DELETE /merchant/products/:id - Menghapus produk

**Kontribusi**
Silakan buat pull request atau membuka issue untuk memberikan saran atau melaporkan bug.

**Lisensi**
Proyek ini dilisensikan di bawah MIT License.
