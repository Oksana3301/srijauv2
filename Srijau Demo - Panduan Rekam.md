# Srijau — Video Demo: Panduan Rekam ke MP4

Video demo (`Srijau Demo.html`) adalah animasi HTML/CSS yang berjalan di browser. Untuk
pitch deck / accelerator, rekam layar menjadi MP4. Berikut cara mendapatkan hasil bersih.

## Spesifikasi
- **Kanvas**: 1920×1080 (16:9), durasi ±43 detik, 7 scene, auto-loop.
- **Audio**: ambient pad opsional — klik tombol **♫ Suara** sebelum merekam bila ingin ada suara.

## A. Persiapan tampilan bersih
1. Buka `Srijau Demo.html` di **Chrome** (layar penuh, jendela ≥ 1920px lebar ideal).
2. Sembunyikan bilah kontrol bawah saat merekam — di Console (F12) tempel:
   ```js
   document.querySelector('.chrome').style.display='none';
   ```
   (Untuk memunculkan lagi: ganti `'none'` → `'flex'`.)
3. Klik **Putar ulang** agar mulai dari Scene 1. Bila mau suara, klik **♫ Suara** dulu.

## B. Rekam (pilih salah satu)

**Cara 1 — QuickTime (Mac, paling mudah)**
- QuickTime Player → File → New Screen Recording → pilih area kanvas → Rekam.
- Mulai tepat saat klik Putar ulang; rekam 1 putaran penuh (±43 dtk) lalu stop.

**Cara 2 — Perekam bawaan**
- macOS: `Cmd+Shift+5` → rekam area terpilih.
- Windows: `Win+G` (Xbox Game Bar) → Rekam.

**Cara 3 — Kualitas tertinggi (tanpa kursor, frame presisi)**
- Pakai OBS Studio → Sumber "Window Capture" pilih jendela Chrome → Base/Output 1920×1080, 60fps.
- Mulai rekam, klik Putar ulang, rekam satu loop, stop.

## C. Rapikan
- Potong (trim) agar mulai pas di Scene 1 dan berhenti di akhir Scene 7 (sebelum loop berulang),
  bila tidak ingin video mengulang.
- Ekspor **MP4 H.264, 1080p, 30 atau 60 fps**.

## D. Naskah Voice-Over (opsional, Bahasa Indonesia)
Selaras dengan timing tiap scene — register Srijau, tanpa "kamu/Anda":

| Scene | Waktu | Narasi |
|---|---|---|
| 1 | 0–5s | "Masa depan hijau adalah milik kita — platform karier hijau untuk perempuan Indonesia." |
| 2 | 5–12s | "Semuanya dimulai dari satu kuis singkat untuk mengenali minat." |
| 3 | 12–20s | "Dalam hitungan detik, muncul jalur karier hijau yang paling sesuai." |
| 4 | 20–27s | "Lengkap dengan lowongan nyata — peluang, bukan sekadar wacana." |
| 5 | 27–33s | "Ditemani komunitas dan mentor yang menumbuhkan setiap langkah." |
| 6 | 33–38s | "Dan setiap langkah tercatat — dampak yang terukur." |
| 7 | 38–43s | "Srijau. Mulai dari satu langkah hijau." |

> Tip: rekam VO terpisah lalu gabungkan di editor (CapCut/Premiere/DaVinci) agar tempo pas.
> Bila ingin durasi VO lebih lega, beri tahu — timing tiap scene bisa disetel.

## E. Catatan
- Animasi menghormati `prefers-reduced-motion`; untuk rekaman, pastikan OS **tidak** dalam mode
  "kurangi gerak" agar animasi penuh tampil.
- Jika ingin saya ubah durasi total (mis. tepat 40 dtk) atau tempo per scene, sebutkan saja.
