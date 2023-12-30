const puppeteer = require('puppeteer');
const sharp = require('sharp');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  const url = process.env.GRAFANA_URL;
  const selector = process.env.SELECTOR;

  // Pengaturan resolusi
  await page.setViewport({ width: 1920, height: 1080 });

  // Nonaktifkan cache pada halaman
  await page.setCacheEnabled(false);

  // Navigasi ke halaman dan tunggu hingga halaman selesai dimuat
  const waitTime = process.env.WAIT_TIME;
  await page.goto(url);
//  await page.waitForTimeout(5000); // Waktu tunggu sebelum mengambil screenshot (dalam milidetik)
  await page.waitForTimeout(waitTime); // Waktu tunggu sebelum mengambil screenshot (dalam milidetik)

  // Tunggu hingga elemen dengan selektor tertentu muncul
  await page.waitForSelector(selector);

  // Dapatkan elemen yang sesuai dengan selektor
  const element = await page.$(selector);

  // Dapatkan kotak pembatas elemen
  const boundingBox = await element.boundingBox();

  // Tentukan area yang akan di-crop
  const cropArea = {
    x: boundingBox.x, // Nilai koordinat x dari area crop (kiri elemen)
    y: boundingBox.y, // Nilai koordinat y dari area crop (atas elemen)
    width: boundingBox.width - parseInt(process.env.LEBAR), // Nilai lebar area crop (setengah lebar elemen)
    height: boundingBox.height - parseInt(process.env.TINGGI), // Nilai tinggi area crop (tinggi elemen)
  };

  // Ambil screenshot
  const screenshotBuffer = await page.screenshot();

  // Crop gambar sesuai dengan area yang ditentukan
  const croppedImageBuffer = await sharp(screenshotBuffer)
    .extract({
      left: cropArea.x,
      top: cropArea.y,
      width: cropArea.width,
      height: cropArea.height,
    })
    .toBuffer();

  // Simpan hasil crop ke file
  const outputPath = process.env.OUTPUT_DIR;
  await sharp(croppedImageBuffer).toFile(outputPath);

  // Tutup browser
  await browser.close();
})();
