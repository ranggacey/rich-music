# RAWr Music

**Pemutar musik web gratis** bergaya Spotify, dengan katalog [YouTube Music](https://music.youtube.com). Tanpa akun.

- **Website:** [rawr-music.vercel.app](https://rich-music.vercel.app)
- **Repo:** [github.com/ranggacey/rich-music](https://github.com/ranggacey/rich-music)


Project ini **gratis** dan **bebas dipakai**. Fork, ubah, deploy sendiri, atau bagikan — silakan.

---

## Tentang

**RAWr Music** adalah pemutar musik berbasis browser. Cari lagu, buka album dan artis, buat playlist, lihat lirik, atur antrian, dan kelola library musik — semuanya tanpa perlu membuat akun.

Library seperti favorit, playlist, riwayat, dan statistik disimpan secara lokal di perangkat pengguna. Audio diputar melalui pemutar resmi YouTube.

RAWr Music tidak berafiliasi dengan YouTube, Google, atau Spotify.

---

## Channel Telegram

Update, informasi fitur, dan komunitas:

### [t.me/ChRichStore](https://t.me/ChRichStore)

Silakan bergabung.

---

## Cara Menggunakan Website

1. Buka **[rawr-music.vercel.app](https://rawr-music.vercel.app)**
2. Cari lagu, atau pilih dari **Home / Charts / Browse All**
3. Lagu pertama akan langsung diputar.
4. Klik lagu lain untuk memilih lagu berikutnya.
5. Gunakan ikon ❤️ untuk menambahkan lagu ke favorit.
6. Gunakan **Playlist** untuk menyimpan lagu ke playlist.
7. Pada halaman album atau artis, gunakan **Save** untuk menyimpannya ke library.
8. Untuk memindahkan library ke perangkat lain, gunakan **Library → Backup**, kemudian **Restore** pada perangkat baru.

### Desktop / PC

RAWr Music dapat langsung digunakan di laptop atau komputer. Buka website, pilih lagu, dan mulai memutar musik tanpa konfigurasi tambahan.

### Putar di Latar Belakang Android

Musik dapat tetap berjalan ketika layar terkunci atau pengguna berpindah aplikasi.

Buka [rawr-music.vercel.app](https://rawr-music.vercel.app) menggunakan **[Brave Browser](https://play.google.com/store/apps/details?id=com.brave.browser)**, putar lagu, kemudian keluar dari tab atau kunci perangkat.

Di Chrome, aktifkan **⋮ → Situs desktop** jika diperlukan.

---

## Fitur

### 🏠 Home

- Sapaan berdasarkan waktu dan tanggal
- Recently Played
- Mix for You — rekomendasi berdasarkan favorit dan riwayat
- Liked Songs
- Playlist lokal
- Item Saved
- Rak musik dari YouTube Music
- Carousel yang dapat digeser
- Navigasi carousel dengan panah pada desktop

### 🔎 Search

- Saran otomatis saat mengetik
- Filter:
  - All
  - Songs
  - Videos
  - Albums
  - Artists
  - Playlists
- Top Result sebagai kartu utama
- Hasil pencarian dikelompokkan berdasarkan jenis
- Riwayat pencarian
- Browse All berdasarkan mood dan genre

### 📚 Library

Library tersedia tanpa login dan disimpan secara lokal pada perangkat.

| Tab | Isi |
| --- | --- |
| Playlists | Playlist buatan pengguna + Liked Songs |
| Favorites | Lagu yang ditambahkan ke favorit |
| Saved | Album, playlist, dan artis yang disimpan |
| History | Riwayat lagu yang baru diputar |
| Stats | Total pemutaran, menit, artis teratas, dan lagu teratas |

Fitur Library:

- Membuat playlist baru
- Import dari link YouTube Music
- Backup library ke file JSON
- Restore library dari file JSON
- Rename playlist
- Menghapus playlist
- Mengurutkan lagu
- Drag & drop pada desktop

### 🎵 Player

- Streaming melalui YouTube IFrame
- Pengaturan kualitas melalui menu
- Preview lagu tanpa mengganggu lagu yang sedang diputar
- Shuffle
- Repeat:
  - Off
  - Repeat All
  - Repeat One
- Kecepatan pemutaran 0.5×–2×
- Antrian lagu
- Play Next
- Add to Queue
- Related songs
- Related albums
- Related playlists
- Related artists
- Lirik tersinkronisasi
- Tap baris lirik untuk berpindah posisi
- Share melalui menu perangkat atau salin tautan
- Download MP3
- SponsorBlock untuk melewati intro atau sponsor
- Sleep Timer
- Floating Widget
- Picture-in-Picture
- Dark / Light Mode
- Navigasi ke halaman artis

### ⌨️ Pintasan Keyboard

| Tombol | Aksi |
| --- | --- |
| `Space` | Play / Pause |
| `Shift` + `→` | Lagu berikutnya |
| `Shift` + `←` | Lagu sebelumnya |
| `Esc` | Tutup Now Playing |
| `L` | Ganti tema |
| `P` | Buka widget |

---

## Menjalankan di Komputer

Pastikan **[Node.js](https://nodejs.org)** versi 18 atau lebih baru sudah terpasang. Versi 20 direkomendasikan.

Clone repository:

```bash
git clone https://github.com/ranggacey/rich-music.git
cd rich-music
