# Panduan — Favicon, Git, & Self-host Font

Panduan singkat untuk tiga hal teknis tambahan. Tidak ada perubahan desain.

---

## 1. Favicon (sudah dipasang ✅)

- `favicon.ico` (16/32/48 px) sudah dibuat dari logo dan diletakkan di root.
- Tiap halaman sudah memuat:
  ```html
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="/images/logo.png" />
  <link rel="apple-touch-icon" href="/images/logo.png" />
  ```
- Browser otomatis meminta `/favicon.ico`, jadi tab, bookmark, dan ikon Android/iOS sudah terisi.
- Tidak ada langkah lanjutan yang perlu dilakukan.

---

## 2. Menyiapkan repositori Git

Berkas `.gitignore` sudah disertakan. Jalankan dari folder proyek:

```bash
git init
git add .
git commit -m "Srijau website — siap produksi"
```

Hubungkan ke remote (GitHub):

```bash
# buat repo kosong dulu di github.com (tanpa README),
# lalu:
git branch -M main
git remote add origin https://github.com/<user>/<nama-repo>.git
git push -u origin main
```

Atau dengan GitHub CLI (otomatis membuat repo):

```bash
gh repo create srijau-web --public --source=. --remote=origin --push
```

Setelah ada di GitHub, impor ke Vercel (lihat `README.md` bagian Deploy).

---

## 3. Self-host font ke `/fonts` ✅ (AKTIF)

> **Status: selesai.** 10 berkas `.woff2` ada di `/fonts`, `/fonts/fonts.css` aktif
> (Instrument Serif 400 + italic; Inter 300/400/500/600 normal + italic), dan ke-6
> halaman memuatnya via `<link rel="stylesheet" href="/fonts/fonts.css">` + `preload`
> untuk dua face utama. Tiga baris Google Fonts sudah dihapus. Validitas font sudah
> diuji (semua face memuat & ter-decode). Bagian di bawah disimpan sebagai referensi.

### Langkah

**a. Unduh 6 berkas `.woff2`** (paling mudah lewat google-webfonts-helper):

1. Buka https://gwfh.mranftl.com/fonts
2. Cari **Instrument Serif** → pilih style `regular` (400) dan `italic` → unduh (format **woff2**, charset **latin**).
3. Cari **Inter** → pilih weight `300, 400, 500, 600` → unduh (woff2, latin).
4. Ganti nama berkas agar sama persis dengan yang dirujuk `fonts.css`, lalu taruh di folder `/fonts`:

   ```
   fonts/instrument-serif-400.woff2
   fonts/instrument-serif-400-italic.woff2
   fonts/inter-300.woff2
   fonts/inter-400.woff2
   fonts/inter-500.woff2
   fonts/inter-600.woff2
   ```

   > Alternatif via npm: `npm i @fontsource/inter @fontsource/instrument-serif`
   > lalu salin berkas woff2 dari `node_modules/@fontsource/...` ke `/fonts`.

**b. Ganti pemuatan font di `<head>` tiap halaman.** Hapus tiga baris Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
```

Ganti dengan satu baris:

```html
<link rel="stylesheet" href="/fonts/fonts.css" />
<link rel="preload" href="/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin />
```

(`preload` opsional, untuk mempercepat teks body yang paling sering muncul.)

**c. Tambahkan cache header** untuk `/fonts` di `vercel.json` (immutable 1 tahun) —
blok header yang sama seperti `/images` sudah ada; tinggal salin sumbernya menjadi
`"/fonts/(.*)"`.

### Verifikasi
Buka situs → DevTools → Network → filter "Font": semua `.woff2` harus berasal dari
domain sendiri (bukan `fonts.gstatic.com`) dan berstatus 200.

> Catatan: berkas font tidak bisa diunduh otomatis dari lingkungan ini (akses lintas
> domain dibatasi), sehingga langkah unduh dilakukan manual. Bila berkas sudah ada di
> `/fonts`, beri tahu saya — penggantian `<head>` di 6 halaman bisa saya kerjakan sekaligus.
