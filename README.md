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
├── expert-falasifah.html               # Artikel Expert Share
├── educational-energi-komunitas.html   # Artikel Educational
├── educational-plts-simulasi.html      # Artikel Educational
├── public/                             # Aset statis (disajikan di root /)
│   ├── images/                         # Foto & gambar (webp + jpg)
│   ├── fonts/                          # Instrument Serif + Inter (self-hosted .woff2)
│   ├── styles/                         # CSS per halaman + suaramu.css
│   ├── scripts/                        # JS per halaman + suaramu.js
│   ├── favicon.ico · robots.txt · sitemap.xml
├── vite.config.js                      # Konfigurasi multi-page (MPA)
├── vercel.json                         # Header cache + keamanan, cleanUrls
└── package.json
```

Aset di `public/` dirujuk lewat path absolut (`/images/...`, `/styles/...`, `/scripts/...`, `/fonts/...`) sehingga bekerja sama persis di dev maupun production.

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
