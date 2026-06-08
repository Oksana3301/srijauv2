# Srijau — Web Design System

> Design system untuk website Srijau, diekstrak dari hero "The future of green is ours."
> Siap dipakai di Claude Design sebagai single source of truth visual.
> Versi 1.0 · Juni 2026 · Turunan dari DeCarbonHub by Srijau Brand Guide v1.0

---

## 0. Cara pakai dokumen ini

Lempar dokumen ini + file `srijau-hero-full.html` ke Claude Design. Hero itu adalah
**reference implementation** — semua token di bawah sudah hidup di sana. Bangun halaman
lain dengan token yang sama persis agar satu kesatuan.

---

## 1. Brand Essence

- **Nama:** Srijau = "Sri" (Dewi Sri, kemakmuran Nusantara) + "Jau" (cahaya, jangkauan, harapan).
- **Arti:** Kemakmuran yang berakar.
- **Personality:** Optimistic · Credible · Indonesian · Minimal-Tech.
- **Voice:** Tegas. Hangat. Faktual. Membumi.
- **Tagline hero:** *The future of green is ours.*

---

## 1B. Logo (LOCKED)

Mark Srijau adalah satu bentuk daun/tetesan yang menyatukan empat makna: **huruf S** (Srijau),
**tunas** (pertumbuhan), **profil wajah perempuan** (Dewi Sri), dan **daun** (hijau). Gradient mark
adalah Wine→Forest — identik dengan brand color, jadi logo dan palet otomatis harmonis.

### Varian file
| File | Bentuk | Pakai untuk |
|---|---|---|
| `srijau-mark-rounded.png` | Mark putih di kotak gradient (app-icon) | **Nav, favicon, avatar sosial** — paling aman, self-contained, jalan di background apapun |
| `srijau-mark-transparent.png` | Mark gradient, background & cutout transparan | Di atas background **cream/terang** (section konten) |
| `srijau-mark-mono-cream.png` | Mark cream solid, transparan | Di atas background **gelap/foto** bila tidak pakai rounded |
| `srijau-fill.png` / `srijau-mark.png` | Asli (background hitam) | **JANGAN** dipakai langsung di web — background hitamnya solid |

### Logo lockup (horizontal)
`[ rounded mark ]  Srijau`
- Wordmark "Srijau" memakai **Instrument Serif**, ukuran ≈ 0.65× tinggi mark.
- Jarak mark ↔ wordmark = 12px.
- Warna wordmark: Cream di background gelap, Charcoal di background terang.

### Aturan & clearance
- Ukuran minimum mark: 32px digital.
- Clearance: ruang kosong ≥ 0.5× tinggi mark di sekeliling.
- **JANGAN** pakai versi background-hitam di web (kotak hitam). Selalu rounded / transparent / mono.
- **JANGAN** rotate, skew, stretch, atau ganti gradient (selalu Wine→Forest).
- **JANGAN** pisahkan profil wajah dari daun.
- Di nav sticky: pakai **rounded mark** (radius 11px) + wordmark Instrument Serif Cream.

### Catatan untuk Claude Design
Saat menempatkan logo: di hero/section gelap → rounded mark + wordmark Cream. Di section cream →
`srijau-mark-transparent.png` + wordmark Charcoal. Favicon & social = rounded. Jangan pernah render
file `srijau-fill`/`srijau-mark` asli tanpa proses transparansi.

---

## 2. Color Tokens (LOCKED)

```css
/* Primary — dari logo Srijau */
--wine:        #7B2D3F;   /* CTA primary, brand mark, headline accent */
--wine-soft:   #B8627A;   /* hover, lighter accent */
--forest:      #2E6951;   /* secondary CTA, success, aksi & dampak */
--forest-dark: #1F4A37;   /* hover forest */
--clay:        #6B4F4A;   /* mid-tone, muted accent */

/* Secondary — functional accent */
--daun:        #34C77B;   /* micro-success only, MAX 10% */
--daun-soft:   #D4F4E2;   /* bg success */
--gold:        #C89B5C;   /* premium, founding badge, hero accent */
--gold-soft:   #E8C896;   /* eyebrow text, soft highlight */

/* Neutral */
--cream:       #FAF6F0;   /* background utama — BUKAN putih murni */
--ivory:       #FFFEFA;   /* card, modal */
--sand:        #F1EAE0;   /* alternate section */
--charcoal:    #1A1612;   /* text primary, dark hero base */
```

**Rule 60-30-10:** 60% neutral (cream/ivory) · 30% Wine+Forest · 10% accent (Gold/Daun).
**Gradient brand:** `linear-gradient(135deg, #7B2D3F 0%, #6B4F4A 50%, #2E6951 100%)`.
Background utama selalu Cream, bukan `#FFFFFF`.

---

## 3. Typography

### Font families
| Role | Font | Source |
|---|---|---|
| **Heading / Display** | **Instrument Serif** | Google Fonts |
| Body & UI | Inter (300/400/500/600) | Google Fonts |
| Numbers / alt display | Clash Display | Fontshare |

> **Keputusan baru (dipakai di hero):** SEMUA heading & nav memakai **Instrument Serif** untuk
> kesan mewah/editorial. Inter hanya untuk body, label, eyebrow, dan UI kecil.

### Type scale (desktop)
```
Hero Display   clamp(52px, 8.5vw, 112px)  Instrument Serif  line-height .96
H1             clamp(40px, 6vw, 72px)      Instrument Serif  line-height 1.0
H2             36px                         Instrument Serif  line-height 1.1
H3             28px                         Instrument Serif  line-height 1.2
Nav link       17–18px                      Instrument Serif
Body L         18px                         Inter 300/400     line-height 1.6
Body           16px                         Inter 400         line-height 1.6
Eyebrow/Label  12px                         Inter 600  letter-spacing .22em  UPPERCASE
```

### Aturan
- Gold accent `›` di depan kata kunci headline (lihat hero: "› is ours.").
- Eyebrow selalu Inter uppercase letterspaced + warna `--gold-soft`.
- Jangan Instrument Serif untuk body panjang — hanya heading & 1–3 kata accent.

---

## 4. Spacing & Layout — "Clean & Lapang" (PRINSIP UTAMA)

> Inspirasi dari referensi: section bersih, ruang putih lega, hierarki sangat jelas,
> warna dipakai HANYA sebagai aksen. TAPI dengan token brand Srijau — bukan hitam-putih
> monospace. Inilah cara mengawinkan keduanya secara elegan.

### Aturan ruang (wide spacing)
```
Section padding vertical   140–180px desktop / 80px mobile   ← LEBIH lega dari biasa
Container max-width         1200px, selalu di-center
Gutter kiri-kanan           clamp(24px, 6vw, 96px)
Jarak heading → body        24–32px
Jarak antar elemen utama    minimum 48px
Grid cards                  gap 24–32px (jangan rapat)
```
Prinsip: **kalau ragu, beri ruang lebih.** Satu section = satu pesan. Jangan jejalkan.

### Hierarki jelas (clear hierarchy)
Tiap section mengikuti pola 3-lapis yang konsisten:
1. **Eyebrow** — label kecil uppercase letterspaced, warna Forest atau Gold (mis. "Dampak", "Ekosistem", "Konten")
2. **Heading** — Instrument Serif besar, Charcoal, maksimal 4 kata kalau bisa
3. **Body pendek** — Inter, 1–2 kalimat, warna Charcoal 75%

Ini pola yang terlihat di referensi (Eyebrow "Dampak" → Heading "Perubahan yang terukur" → body singkat). Pakai persis pola ini di SEMUA section.

### Warna sebagai AKSEN (bukan dominan)
- Background section: **selalu Cream `#FAF6F0`** (90% halaman) atau Ivory untuk selang-seling.
- Wine & Forest: hanya untuk **CTA, eyebrow, angka stat, garis aksen** — total ≤ 15% area.
- Satu section gelap (Charcoal) untuk footer/CTA besar sebagai jeda ritme.
- Stat besar (500K+, 2.3M): angka Charcoal tebal, label di bawahnya kecil Mist. Kartu ber-border tipis `#E8E2D6`, radius 16–18px, TANPA shadow berat — bersih.

### Komponen "clear glass" (kartu)
- Di atas Cream: kartu Ivory + border 1px `#E8E2D6`, radius 18px, shadow sangat halus.
- Di atas foto/hero gelap: glassmorphism (rgba putih 0.12 + blur 12px).
- Isi kartu lega: padding 28–32px, jangan mepet tepi.

Grid: mobile-first. Breakpoint utama 768px. iPhone 12 mini (375px) wajib no horizontal scroll.

---

## 5. Motion & Easing

```css
--ease-fade:   cubic-bezier(0.22, 1, 0.36, 1);   /* entrance, opacity, parallax */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* card hover, CTA, cursor */
```

| Tipe | Durasi |
|---|---|
| Micro (hover, tooltip) | 200ms |
| Standard (card, modal) | 300–400ms |
| Hero (entrance, fade-up) | 600–1100ms |
| Ambient (ken burns) | 20s+ |

**Pattern library:** fade-up on scroll · ken burns slow scale (hero bg) · magnetic CTA ·
card lift `translateY(-15px) scale(1.25)` · arrow nudge `→` 4px · dock hover via `:has()`.
`prefers-reduced-motion` WAJIB di-respect.

---

## 6. Komponen Inti (sudah hidup di hero)

### 6.1 Nav (glass pill)
- Fixed top-center, `border-radius:100px`.
- `background: rgba(250,246,240,0.07)` + `backdrop-filter: blur(12px)`.
- Border `1px rgba(250,246,240,0.12)`.
- Link: Instrument Serif 18px, hover → `--gold-soft`.
- Item Srijau: Home · Solution · Business · ✦ · Content · Community · About.

### 6.2 Hero
- **Full-bleed single image** (`object-fit:cover`), opacity 1 default + ken burns scale.
- Scrim kiri-bawah untuk legibilitas teks (gradient charcoal).
- Teks kiri tengah, Instrument Serif besar + gold `›` accent.
- CTA pill gold dengan arrow nudge.
- **JANGAN pakai mix-blend-mode untuk layer gambar** — rapuh, bisa hitam. Satu gambar utuh.

### 6.3 Glass cards (dock)
- `background: rgba(255,255,255,0.15)` + blur(12px), border `rgba(255,255,255,0.22)`.
- STATIC saat idle (tanpa animasi loop).
- Hover: `translateY(-15px) scale(1.25)` + shadow, `--ease-spring`.
- Sibling dock: `.cards:has(.card:hover) .card:not(:hover){transform:scale(.96);opacity:.7}`.

### 6.4 Custom cursor
- 30×30 lingkaran, border putih, `mix-blend-mode:difference`, lerp 0.18.
- Scale ke 50×50 saat hover elemen `[data-cursor]`.
- Hidden di `pointer:coarse` (mobile).

### 6.5 Floating button "Suaramu"
- Fixed kanan-bawah, ikon pesan, semua halaman. Buka modal survey/feedback.

---

## 7. Imagery Direction

- **Mood:** Indonesia hangat — perempuan, alam Nusantara, kota hijau, mentari pagi.
- **Treatment:** saturation ~90% (sedikit muted), warmth +10, highlight cream, shadow lembut.
- **Avoid:** stock bule corporate, gestur jempol, pemandangan Eropa, kontras keras.
- **Hero saat ini:** perempuan berkebaya berjalan di jalan setapak menuju kota hijau +
  turbin angin + panel surya saat sunrise, dibingkai dedaunan. Inilah patokan visual.

---

## 8. Robustness Rules (pelajaran dari hero gagal)

1. Gambar hero = **satu file utuh**, `opacity:1` default. Jangan bergantung JS untuk terlihat.
2. Entrance pakai **CSS animation**, bukan JS, agar tetap muncul kalau JS mati.
3. **Hindari `mix-blend-mode:screen`** untuk komposit gambar berlapis.
4. JS hanya **enhancement** (parallax, cursor) — bukan syarat agar konten terlihat.
5. Untuk preview/embed, gambar boleh di-base64-kan; untuk produksi pakai `<img src>` + CDN.

---

## 9. Copywriting Guide (WAJIB)

**Register:** semi-formal, sopan, mengajak — tidak kaku. **Jangan pakai "kamu" atau "Anda."**
Hindari sapaan orang kedua sama sekali.

**Cara tanpa pronoun:**
- Ajakan tanpa subjek: "Mulai dari satu kuis singkat." / "Kenali jalur karier hijau yang sesuai."
- "Mari" untuk ajakan hangat: "Mari mulai dari langkah kecil."
- Berbasis manfaat/benda: "Karier energi terbarukan, terbuka untuk semua latar belakang."
- "Kita" hanya sesekali untuk kebersamaan.

**Singkat & lapang:** headline ≤ 8 kata; subteks ≤ 2 kalimat; paragraf ≤ 3 baris;
ruang putih > teks; satu section satu ide.

**Frasa TERLARANG:** "Selamat datang", "Kami berkomitmen", "Solusi terbaik", "Di era modern ini",
"Wujudkan impianmu", "revolusioner", "game-changer", "seamless", "transformasi digital",
"one-stop solution", "going green", semua "kamu/Anda".

**Contoh register yang dituju:**
- ❌ "Temukan karier hijau impianmu sekarang." → ✅ "Jalur karier hijau, dimulai dari satu kuis 90 detik."
- ❌ "Kami siap membantu Anda bertransisi." → ✅ "Transisi ke sektor hijau, dengan panduan di tiap langkah."
- ❌ "Yuk gabung komunitas kita!" → ✅ "Mari bergabung dengan komunitas perempuan hijau Indonesia."
- ❌ "Ajari anakmu cinta lingkungan." → ✅ "Menanamkan cinta lingkungan sejak dini — lewat bermain, bukan menggurui."

**CTA:** kata kerja tanpa pronoun — "Mulai kuis", "Lihat jalur", "Bergabung", "Jelajahi".
Bukan "Klik di sini" / "Pelajari lebih lanjut".

---

## 10. Pola Section Universal (terapkan di semua halaman)

Setiap section dibangun dari blok yang sama agar konsisten & lapang:

```
[ Eyebrow kecil — Forest/Gold, uppercase ]
[ Heading — Instrument Serif besar, Charcoal, ≤ 4–6 kata ]
[ Body — Inter, 1–2 kalimat, Charcoal 75% ]
[ ruang 48px+ ]
[ Konten: kartu / grid / stat / form — lega, border tipis, radius 18px ]
[ CTA tunggal — pill Wine atau ghost ]
```

Aturan ritme antar-section: **terang (Cream) → terang → 1 jeda gelap (Charcoal) → terang.**
Hindari dua section gelap berurutan. Footer = satu blok Charcoal besar.

**CATATAN:** referensi screenshot user dipakai untuk PRINSIP (ruang, hierarki, kebersihan),
BUKAN untuk warna/font. Warna tetap Wine/Forest/Cream, heading tetap Instrument Serif.
