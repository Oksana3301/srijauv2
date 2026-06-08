# Srijau — Web

Platform karier hijau untuk perempuan Indonesia. Situs statis multi-halaman, dibangun dengan **Vite** dan siap deploy ke **Vercel**.

## Struktur

```
.
├── index.html                          # Home
├── solution.html                       # Solution (kuis + hasil + lowongan + gamifikasi)
├── business.html                       # Business (toggle Keluarga / DeCarbonHub)
├── content.html                        # Content (Artikel · Educational · Expert Share)
├── community.html                      # Community (EcoSisters · Mentor · EcoPulse)
├── about.html                          # About (Visi · Theory of Change · Tim)
├── expert-falasifah.html               # Artikel Expert Share (+ pre/post-test)
├── educational-pengantar-green-jobs.html   # Artikel Educational — pengantar (+ pre/post-test)
├── educational-energi-komunitas.html   # Artikel Educational (+ pre/post-test)
├── educational-plts-simulasi.html      # Artikel Educational (+ pre/post-test)
├── public/                             # Aset statis (disajikan di root /)
│   ├── images/                         # Foto & gambar (webp + jpg)
│   ├── fonts/                          # Instrument Serif + Inter (self-hosted .woff2)
│   ├── styles/                         # CSS per halaman + suaramu/prepost/waitlist
│   ├── scripts/                        # JS per halaman + suaramu/prepost/waitlist
│   ├── favicon.ico · robots.txt · sitemap.xml
├── vite.config.js                      # Konfigurasi multi-page (MPA) — 10 entri
├── vercel.json                         # Header cache + keamanan, cleanUrls
└── package.json
```

Aset di `public/` dirujuk lewat path absolut (`/images/...`, `/styles/...`, `/scripts/...`, `/fonts/...`) sehingga bekerja sama persis di dev maupun production.

## Fitur

- **Navigasi** clean-URL antar-halaman (cleanUrls Vercel), hero responsif mobile.
- **Suaramu** — FAB + modal survei global (semua halaman), kirim ke Apps Script.
- **Solution** — kuis passion; hasil, lowongan, & gamifikasi terbuka setelah kuis (bisa diulang).
- **Business** — toggle Untuk Keluarga / Untuk Bisnis (DeCarbonHub).
- **Pre/Post-test** — otomatis di tiap artikel Educational & Expert Share; pre mengunci konten, post + popup wajib, kirim `form_type=pretest|posttest` (session_id sama).
- **Waitlist** — satu form penutup per halaman utama (Home/Solution/Business/Content/Community/About), kirim `form_type=waitlist`.

## Menjalankan lokal

```bash
npm install
npm run dev        # server pengembangan (http://localhost:5173)
npm run build      # build production → dist/
npm run preview    # pratinjau hasil build
```

## Deploy ke Vercel

1. Push repositori ini ke GitHub.
2. Di Vercel: **Add New → Project**, lalu impor repo GitHub-nya.
3. Vercel mendeteksi **Vite** otomatis. Pengaturan (sudah cocok dengan `vercel.json`):
   - Build Command: `vite build`
   - Output Directory: `dist`
4. Klik **Deploy**.

Pembaruan berikutnya cukup `git push` — Vercel rebuild otomatis.

## Catatan

- File `__preview_*.html` di root adalah salinan pratinjau lokal (path relatif) — sudah di-`.gitignore` dan **tidak** ikut ke-deploy. Sumber kebenaran adalah file HTML produksi di root.
- Font di-*self-host* dari `public/fonts` (tanpa permintaan ke Google Fonts saat production).
- Semua gambar memakai `<picture>` webp + fallback jpg, `loading="lazy"`, dan `object-fit: cover`.
