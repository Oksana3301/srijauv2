# Panduan Menambah Gambar & Konten

Cara aman menambah gambar dan konten tanpa salah tempat. Semua contoh memakai
path absolut `/images/…` (sesuai struktur deploy).

---

## 0. Aturan emas (baca sekali)

1. **File gambar → selalu masuk folder `/images`.** Tidak ada tempat lain.
2. **Referensi selalu pakai garis miring depan:** `/images/nama-file.jpg`.
3. **Edit file PRODUKSI**, bukan `__preview_*.html`.
   - Halaman asli: `index.html`, `solution.html`, `business.html`,
     `content.html`, `community.html`, `about.html`.
   - `__preview_*.html` hanya salinan untuk dilihat di editor ini — **tidak ikut deploy**.
4. **Urutan tampil = urutan dalam file.** Yang ada lebih atas di kode, tampil lebih atas
   di halaman. Untuk memindah urutan, pindahkan blok kodenya.

---

## 1. Menamai & menaruh file gambar

- Taruh di `/images`. Beri nama jelas dengan huruf kecil & tanda hubung:
  `surya-atap.jpg`, `tim-sekar-ayu.jpg`, `kotak-hijau.jpg`.
- Format: **.webp** atau **.jpg** untuk foto; **.png** untuk logo/ikon transparan.
- Optimalkan dulu (lebar wajar, < ~300 KB). Bisa pakai squoosh.app.

---

## 2. Mengganti placeholder dengan gambar (paling sering)

Setiap kotak bergaris dengan label adalah **slot gambar**. Bentuknya selalu:

```html
<div class="ph NAMA__media"><span>Gambar — keterangan slot</span></div>
```

`<span>` di dalamnya **memberi tahu gambar apa yang harus ditaruh** — cocokkan dengan
judul/teks kartu tepat di bawahnya supaya tidak tertukar.

**Ganti seluruh `<div class="ph …">…</div>` itu dengan satu `<img>`** yang memakai
**kelas `…__media` yang sama** (tanpa `ph`). Berkat helper CSS global, gambar otomatis
pas (cover-crop, rasio benar, sudut membulat):

```html
<!-- SEBELUM -->
<div class="ph post__media"><span>Gambar — panel surya atap</span></div>

<!-- SESUDAH -->
<img class="post__media" src="/images/surya-atap.jpg"
     alt="Panel surya terpasang di atap rumah"
     loading="lazy" decoding="async" />
```

Yang berubah hanya: `div.ph` → `img`, hapus `<span>`, isi `src` + `alt`.
**Selalu isi `alt`** (deskripsi singkat) dan **`loading="lazy"`** untuk gambar yang
tidak di paling atas layar.

---

## 3. Ukuran/rasio tiap jenis slot

Ekspor mendekati rasio ini supaya tidak terpotong aneh:

| Kelas slot        | Rasio  | Saran ukuran | Dipakai di            |
|-------------------|--------|--------------|-----------------------|
| `post__media`     | 16:10  | 800×500      | Home (kartu konten)   |
| `art__media`      | 16:10  | 800×500      | Content & Business    |
| `art__media` (hero)| 16:9  | 1200×675     | Content (Insight utama)|
| `split__media`    | 4:3    | 900×675      | Business (blok split)  |
| `member__photo`   | 1:1    | 600×600      | About (foto tim)       |

---

## 4. Di mana letak tiap slot — checklist lengkap

Urut dari atas ke bawah, persis seperti di halaman. Cocokkan label dengan judul kartu.

### `index.html` — bagian **Konten** (3 slot)
1. `post__media` — “panel surya atap” → kartu **Energi**
2. `post__media` — “ladang angin” → kartu **Karier**
3. `post__media` — “pertemuan komunitas” → kartu **Komunitas**
*(Hero atas sudah memakai foto asli `/images/hero.webp`.)*

### `content.html` (10 slot, berurutan)
- **Reset Trend:** “reskilling hijau”, “ritual keluarga”, “label hijau UMKM”
- **Insight Minggu Ini:** “mengukur dampak” (slot besar `art--hero`)
- **Semua bacaan:** “sertifikasi hijau”, “hemat energi anak”, “emisi rantai pasok”,
  “wawancara kerja”, “belanja musiman”, “insentif pajak”

### `business.html` (6 slot)
- **Untuk Keluarga:** “Kotak Hijau Kecil” (`split__media`); lalu artikel Ibu Hijau:
  “dapur rumah”, “berkebun anak”, “bekal tanpa plastik”
- **Untuk Bisnis:** “dasbor UMKM” (`split__media`), “laporan korporasi” (`split__media`)

### `about.html` — **Tim** (5 slot `member__photo`)
Berurutan: Sekar Ayu, Nadia Rahma, Galih Pratomo, Tari Melati, Rizki Hartono.
Ganti `<div class="member__photo"><span>Foto</span></div>` dengan
`<img class="member__photo" src="/images/tim-sekar-ayu.jpg" alt="Sekar Ayu" loading="lazy" />`.

### `solution.html` & `community.html`
Tidak memakai slot foto (pakai ikon/inisial/peta). Tidak perlu gambar.

---

## 5. Menambah KARTU baru (bukan sekadar ganti gambar)

Mau menambah satu kartu konten/artikel/mentor? **Jangan menulis dari nol** — duplikat
satu blok yang sudah ada lalu ubah isinya. Posisinya = urutan tampil.

1. Cari satu blok kartu lengkap, mis. di `content.html`:
   ```html
   <article class="art reveal" data-cat="karier" data-d="1">
     <div class="ph art__media"><span>Gambar — …</span></div>
     <div class="art__body"> … judul, meta, excerpt, link … </div>
   </article>
   ```
2. **Salin seluruh blok `<article>…</article>`**, tempel tepat sebelum/sesudah kartu
   tetangganya (menentukan urutan).
3. Ubah: gambar, judul, tag, waktu baca, dan—khusus Content—`data-cat`
   (`karier`/`keluarga`/`bisnis`) agar filter kategori tetap jalan.
4. `data-d="1/2/3"` hanya mengatur jeda animasi muncul; pakai 1–3 berselang.

> Grid otomatis menata 3 kolom per baris — cukup tambah/kurangi blok `<article>`,
> tidak perlu mengubah CSS.

---

## 6. Setelah mengedit

- Simpan. Buka halaman untuk memastikan gambar muncul dan tidak gepeng.
- Jika ingin saya rapikan/regenerasi salinan preview, atau bantu menempatkan banyak
  gambar sekaligus — kirim saja file gambar + keterangan “untuk slot mana”, nanti
  saya pasangkan agar pasti tidak salah tempat.

> Catatan: helper agar `<img>` otomatis pas sudah ada di `styles/suaramu.css`
> (berlaku global di semua halaman), jadi contoh di atas langsung bekerja.
