# nodejs-webshot
Aplikasi ini dibuat menggunakan NodeJS untuk memenuhi kebutuhan otomatisasi reporting setiap beberapa waktu sekali penggunaan resource dari server yang digunakan oleh beberapa project di kantor termpat saya bekerja (dalam kasus ini saya mengambil screenshot dari dashboard Grafana, untuk kemudian dikirimkan menggunakan API WhatsApp). Silahkan untuk digunakan dan dikembangkan sesuai dengan kebutuhan. Segala bantuan untuk pengembangan aplikasi sangat terbuka dan sangat saya apresiasi. Semoga bermanfaat

Cara penggunaan:

1. Sesudah clone repo ini, sesuaikan nilai environment variable pada file docker-compose.yml sesuai dengan kebutuhan
2. jalankan perintah: docker-compose up
3. jika sudah selesai maka akan ada folder ./pic yang berisikan hasil screenshot dari halaman web
4. kemudian jalankan perintah: docker compose down
