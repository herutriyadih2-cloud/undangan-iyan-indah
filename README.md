# Undangan Digital 3D — Iyan None & Indah

Undangan pernikahan statis bertema **surga/langit hidup** dengan sampul, animasi pembuka 2.5D/3D selama ±7 detik, parallax mouse/sentuh, countdown, profil, acara, Amplop Digital, video Galeri Kenangan, RSVP WhatsApp, dan penutup. Seluruh ilustrasi/video dibuat orisinal, bukan hasil ekstraksi aset eksternal atau TikTok.

## Status data

Data yang sudah dimasukkan dari pengguna:

- **Iyan None**, putra ketiga dari Bapak Herli & Ibu Ida. Nama panggilan digunakan karena lebih banyak dikenal.
- **Indah**, putri kelima dari Bapak Jumadi & Ibu Maisuna.
- Lokasi di Kediaman Mempelai Wanita, Jl. Desa Kuala Dua, Gg. Selat Madura (Sungai Adong Darat).
- Amplop Digital BCA `1711238951` dan DANA `0895342263665`, keduanya a/n **Muliansah** sesuai data pengguna.

**Tanggal dan jam sudah dikonfirmasi:** akad pada Sabtu, 5 Desember 2026 pukul 08.00–13.00 WIB dan resepsi pada Minggu, 6 Desember 2026 pukul 13.00 WIB–selesai. Countdown diarahkan ke akad pada 5 Desember 2026 pukul 08.00 WIB.

**Foto yang dipilih dari folder `Downloads` pengguna:**
- `photo_5170684142834879647_y.jpg` → foto utama 3D `assets/images/couple-heaven.webp` (latar hitam dibuat transparan).
- `photo_5165655844232826067_y.jpg` → foto utama sebelumnya `assets/images/couple-main.webp`.
- `IMG_5123.JPG` → profil Iyan None `assets/images/muliansyah-profile.webp`.
- `IMG_5124.JPG` → profil Indah `assets/images/indah-profile.webp`.
- `photo_5168297627076988202_y.jpg` → gambar sumber awal `assets/images/location-qr-map.webp`, QR hasil crop `assets/images/location-qr.webp`, dan denah vektor `assets/images/location-map.svg`.

Ketiganya dioptimalkan ke WebP tanpa mengubah file sumber. QR dipotong dari area 320×320 piksel dan dioptimalkan menjadi 640×640 tanpa mengubah file aslinya. Galeri kini memakai video ilustrasi burung dan gunung yang dibuat orisinal secara prosedural.

## Menjalankan undangan

Tidak ada framework, dependensi runtime, font eksternal, atau CDN.

### Cara paling mudah

Double-click `index.html`. Undangan dapat dibuka langsung melalui `file://` di Chrome/Edge/Firefox modern.

### Melalui server lokal (opsional)

Dari folder proyek ini, jalankan:

```powershell
python -m http.server 8000
```

Lalu buka `http://localhost:8000`. Hentikan server dengan `Ctrl+C`.

### Mode preview

- `index.html?preview=open` — melewati sampul/intro dan langsung menampilkan isi.
- `index.html?preview=scene` — menampilkan pose akhir scene secara statis agar mudah ditangkap Chrome headless.
- Saat memakai server: `http://localhost:8000/?preview=open` atau `http://localhost:8000/?preview=scene`.

Tombol **Putar Ulang** tetap dapat menjalankan animasi dari mode scene. Tombol **Lewati**, scroll, atau `Escape` menutup animasi. Jika perangkat memakai `prefers-reduced-motion`, intro dilewati dan replay ditampilkan sebagai gambar diam.

## Struktur

```text
index.html              Kerangka semantic HTML
css/style.css           Seluruh tampilan, responsivitas, dan reduced motion
js/data.js              Pusat teks, data, tautan, konfigurasi, dan path aset
js/scene.js             Timeline kamera/dolly, layered parallax, dan kontrol scene
js/theme.js             Video langit per-viewport dan ambient SVG/CSS
js/main.js              Rendering data dan seluruh interaksi isi
assets/images/          Foto, SVG ornamen, dan poster video
assets/video/           Video ilustrasi burung–gunung H.264
assets/audio/           Backsound pengguna yang dipotong mulai detik 13
tools/                  Generator video orisinal yang dapat direproduksi
preview/                Hasil tangkapan layar dan contact sheet pengujian
```

## Mengganti data dan aset

### 1. Informasi undangan

Edit `js/data.js`. Nama mempelai/orang tua, nama tamu, tanggal ISO, teks, alamat, link Google Maps, serta label galeri dikumpulkan di file ini. Untuk countdown, gunakan `couple.weddingDateISO` dengan zona waktu yang benar, misalnya:

```js
weddingDateISO: "2026-12-05T08:00:00+07:00"
```

Link Maps untuk akad dan resepsi menggunakan titik koordinat yang diberikan pengguna: **-0.176886, 109.435799**, melalui `https://www.google.com/maps/search/?api=1&query=-0.176886%2C109.435799`.

Setelah kartu acara terdapat komposisi **denah vektor + QR terpisah**. Denah `location-map.svg` menampilkan Gg. Selat Madura, Jl. Desa Kuala Dua, Alter Supadio/Sungai Asam, landmark, serta pin Kediaman Mempelai Wanita. Rute bergerak melalui `stroke-dashoffset`, pin berdenyut, dan marker mengikuti rute; seluruhnya diam pada reduced-motion. QR hasil crop `location-qr.webp` tampil stabil tanpa animasi.

Klik denah membuka `location-map.svg` ukuran penuh di tab baru dengan `rel="noopener noreferrer"`, bukan foto lama. Tombol Google Maps tetap menuju koordinat yang sama. Path, alt text, caption, label jalan/landmark, route, serta URL diatur melalui `events.locationVisual` di `js/data.js`.

### 2. Foto

Foto final dapat berupa JPG, PNG, WebP, atau SVG lokal. Salin file ke `assets/images/`, lalu ubah path berikut di `js/data.js`:

- `assets.couple` — foto utama pada sampul, scene, dan hero.
- `assets.portraits.muliansyah` dan `assets.portraits.indah` — foto profil.
Foto pasangan vertikal dengan subjek di tengah akan memberikan hasil terbaik.

### 3. Video Galeri Kenangan

Video burung–gunung dibuat **orisinal secara prosedural** dari SVG buatan sendiri, tanpa aset eksternal/TikTok. Gunung berlapis, matahari emas, dua lapis kabut, foreground pohon, serta empat pose sayap burung dirender dan dianimasikan dengan FFmpeg.

- Video: `assets/video/gallery-birds-mountains.mp4`
- Poster: `assets/images/gallery-birds-mountains-poster.webp`
- Generator: `tools/generate_gallery_video.py`
- Spesifikasi: 1280×720, 10 detik, 24 fps, H.264, loopable, tanpa audio.
- Path, caption, deskripsi aksesibel, dan label kontrol berada di `gallery.video` dalam `js/data.js`.

Regenerasi dari root proyek dengan environment yang sudah tersedia (tanpa instalasi global):

```powershell
C:\Users\drago\Downloads\referensi_tiktok\.venv\Scripts\python.exe tools\generate_gallery_video.py
```

Generator juga menghasilkan `preview/gallery-video-contact-sheet.png` untuk inspeksi beberapa frame. Opsi `--keep-build` menyimpan SVG/PNG intermediate di `tools/.gallery-video-build`.

Video diputar otomatis dengan `muted`, `loop`, dan `playsinline` pada kondisi normal. Tombol **Jeda/Putar** dapat digunakan dengan mouse, sentuh, atau keyboard, termasuk melalui `file://`. Pada `prefers-reduced-motion`, autoplay dimatikan dan poster tetap tampil sampai pengguna secara eksplisit memilih **Putar**.

### 4. Tema Surga / Langit

Satu video langit orisinal digunakan ulang sebagai latar cover, scene, hero, kutipan, acara, dan penutup dengan crop/overlay berbeda. Acara memakai overlay navy–emas untuk menjaga kontras. Countdown, profil, Amplop Digital, dan galeri memakai awan SVG, bintang berkedip, serta kelopak CSS yang ringan.

- Video: `assets/video/heaven-sky.mp4`
- Poster: `assets/images/heaven-sky-poster.webp`
- Generator: `tools/generate_heaven_video.py`
- Konfigurasi path, section, observer, dan jumlah ambient: objek `theme` di `js/data.js`.
- Spesifikasi: 1280×720, 12 detik, 24 fps, H.264, loopable, tanpa audio.

Regenerasi dari root proyek:

```powershell
C:\Users\drago\Downloads\referensi_tiktok\.venv\Scripts\python.exe tools\generate_heaven_video.py
```

Generator menghasilkan `preview/heaven-video-contact-sheet.png` dan tidak merender ulang video galeri burung–gunung. Opsi `--keep-build` menyimpan intermediate di `tools/.heaven-video-build`.

`js/theme.js` menggunakan **IntersectionObserver** dengan margin 240px: video hanya play ketika section mendekati viewport dan pause saat offscreen atau tab tersembunyi. Pada `prefers-reduced-motion`, seluruh video latar berhenti pada poster dan animasi ambient CSS dimatikan. Foto utama serta animasi dolly/parallax scene tetap berfungsi.

### 5. Amplop Digital

Data rekening/e-wallet dan seluruh label berada di objek `gifts` dalam `js/data.js`. Setiap metode memiliki `name`, `numberLabel`, `number`, dan `accountName`. Tombol **Salin Nomor** memakai Clipboard API dengan fallback `document.execCommand` agar tetap dapat digunakan saat undangan dibuka melalui `file://`. Feedback keberhasilan/kegagalan tampil di kartu dan diumumkan melalui `aria-live`.

Contoh struktur:

```js
{
  key: "bca",
  name: "BCA",
  numberLabel: "Nomor rekening",
  number: "1711238951",
  accountName: "Muliansah"
}
```

Tambahkan atau hapus metode melalui `gifts.methods`. Pastikan nomor dan nama pemilik diverifikasi sebelum undangan dibagikan. Setiap metode juga memiliki `logo` dan `logoAlt`; logo ditampilkan lokal dengan proporsi aslinya.

**Sumber logo bank/e-wallet:**
- BCA: [Bank Central Asia.svg — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bank_Central_Asia.svg), disimpan sebagai `assets/images/bca-logo.svg`.
- DANA: [Logo DANA (PNG-1080p) - FileVector69 — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Logo_DANA_(PNG-1080p)_-_FileVector69.png), disimpan sebagai `assets/images/dana-logo.png`.

Ikon acara merupakan SVG orisinal bergaris emas: `assets/images/event-akad.svg` (cincin berlian/ornamen) dan `assets/images/event-resepsi.svg` (lengkungan/lentera). Path serta alt text ikon berada di `events.icons`.

### 8. Musik (opsional)

Backsound aktif menggunakan `assets/audio/backsound-muliansyah-indah.m4a` dari file pengguna `Downloads/AUDIO-2026-11-14-08-17-13.m4a`, dipotong mulai **detik 13** dengan FFmpeg (durasi sekitar 4 menit 26 detik). File asli tidak diubah. Konfigurasi di `js/data.js`:

```js
audio: {
  enabled: true,
  src: "assets/audio/backsound-muliansyah-indah.m4a",
  volume: 0.45,
  loop: true
}
```

Kontrol hanya muncul setelah browser berhasil memuat audio. Pemutaran dimulai dari gestur pengguna jika diizinkan browser; pengguna tetap dapat play/pause sendiri. Gunakan file audio yang benar-benar dimiliki atau berlisensi.

### 9. Ornamen

SVG di `assets/images/` dibuat khusus untuk undangan. Path lengkungan, rangkaian bunga, dan monogram juga dapat diganti melalui `js/data.js`.

## 6. Ucapan & Komentar

Section **Ucapan & Komentar** menampilkan empat contoh komentar dari kategori Keluarga, Sahabat, Tetangga, dan Rekan Kerja. Semua teks diberi label **contoh ucapan** dan bukan testimoni asli. Data berada di objek `comments` pada `js/data.js` dan dapat diganti tanpa mengubah logika carousel.

Carousel berputar otomatis setiap 5,5 detik dengan fade/slide, tombol prev/next, indikator, serta pause/resume. Autoplay berhenti saat hover atau focus, mendukung Arrow keys dan swipe, dan tidak berjalan pada `prefers-reduced-motion`. Tidak ada backend atau pengumpulan komentar pengguna.

## 7. RSVP WhatsApp dan Link Tamu

Section **Konfirmasi Kehadiran & Bagikan Undangan** menyediakan input nama, tombol **Hadir/Tidak Hadir**, pratinjau link, salin link dengan clipboard fallback, serta WhatsApp share. Nama dari query `to` juga ditampilkan pada sampul melalui `textContent`, dengan sanitasi karakter kontrol, trim, dan batas 60 karakter. Mode `preview=open` dan `preview=scene` tetap kompatibel dengan parameter `to`.

Contoh link produksi dengan nama tamu:

```text
https://herutriyadih2-cloud.github.io/undangan-iyan-indah/?to=Bapak%20Andi
```

- Nomor tujuan RSVP saat ini: `62895342263665`.
- Untuk mengganti nomor, ubah `rsvp.whatsappNumber` di `js/data.js` dengan format internasional tanpa `+` atau spasi.
- URL yang dibagikan diatur melalui `rsvp.productionUrl`.
- Pesan RSVP memuat nama tamu, pilihan kehadiran, serta detail akad/resepsi dari `events.items`.
- Label, pesan pembuka, feedback, dan konfigurasi lain berada di objek `rsvp`.

## Informasi yang perlu dikirim untuk versi final

1. Tautan/titik Google Maps yang sudah diverifikasi untuk alamat yang telah diberikan.
2. Nama tamu default atau daftar tamu jika nantinya ingin personalisasi nama.
3. Foto utama dan foto profil pengganti jika nanti diperlukan; galeri sudah memakai ilustrasi video burung–gunung sesuai permintaan.
4. Musik instrumental berlisensi (opsional).
5. Konfirmasi akhir nomor dan nama pemilik rekening/e-wallet sebelum publikasi.
6. Teks pembuka/penutup, dress code, RSVP, atau live streaming bila ingin ditambahkan.
7. Konfirmasi warna dan aset final sebelum rendering video vertikal 1080×1920 (di luar cakupan undangan ini).

## Catatan

- Koneksi internet hanya diperlukan ketika pengguna memilih membuka Google Maps; tampilan dan aset undangan sepenuhnya lokal.
- Amplop Digital hanya menyalin nomor di sisi browser; tidak ada verifikasi pembayaran atau backend.
- Backsound aktif dan diputar setelah gestur pengguna; RSVP membuka WhatsApp dan tidak menyimpan data ke backend.
- Video galeri MP4 sudah termasuk; rendering video vertikal untuk animasi intro tetap di luar cakupan undangan ini.

## Hosting produksi

Undangan dipublikasikan melalui GitHub Pages dengan dukungan pengguna. Repository dan halaman produksi:

- Repository: https://github.com/herutriyadih2-cloud/undangan-iyan-indah
- Website: https://herutriyadih2-cloud.github.io/undangan-iyan-indah/

Folder `preview/`, `tools/`, dan `tests/` hanya digunakan selama pengembangan lokal dan tidak disertakan dalam paket hosting. Tidak ada token atau kredensial yang disimpan di repository. Repository ini bersifat publik; data acara dan metode pembayaran ditampilkan sesuai persetujuan pengguna.

## Catatan tanggal tampilan utama

Sampul, animasi pembuka, hero, dan stempel tanggal menggunakan **6 Desember 2026** sebagai acara puncak/resepsi. Detail kartu Akad Nikah tetap 5 Desember 2026 dan Resepsi tetap 6 Desember 2026. Countdown diarahkan ke Akad Nikah pada 5 Desember 2026 pukul 08.00 WIB.

## Gambar pratinjau WhatsApp

`assets/images/og-whatsapp.png` adalah gambar Open Graph berukuran **1200×630** yang dibuat khusus dengan foto pengantin, nama, dan tanggal acara. Meta tag Open Graph dan Twitter Card terpasang di `index.html`, sehingga WhatsApp dapat menampilkan pratinjau visual saat link dibagikan. Pratinjau dapat membutuhkan waktu untuk diperbarui di cache WhatsApp.

## Animasi ayat

Teks Arab dan terjemahan pada bagian ayat muncul **kata demi kata** ketika section memasuki viewport. Setiap kata memiliki delay berjenjang, fade, blur, dan perpindahan vertikal kecil. Pada `prefers-reduced-motion`, teks ditampilkan langsung tanpa animasi.
