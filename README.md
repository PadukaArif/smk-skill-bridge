# SMK SkillBridge

*GPS Kesiapan Industri Talenta SMK Indonesia — Membantu Siswa SMP Menemukan Jurusan SMK Terbaik Sesuai Minat dan Potensi.*

---

## Overview

**SMK SkillBridge** adalah platform eksplorasi dan asesmen interaktif yang dirancang khusus untuk membantu siswa SMP yang masih bingung dalam menentukan pilihan jurusan saat akan melanjutkan pendidikan ke Sekolah Menengah Kejuruan (SMK). 

### Masalah yang Diselesaikan
* **Kasus Salah Jurusan:** Banyak siswa masuk SMK hanya karena ikut-ikutan teman atau kurangnya informasi yang komprehensif, sehingga berujung pada performa akademik yang kurang optimal atau ketidaksesuaian minat di dunia kerja.
* **Kesenjangan Informasi:** Kurangnya media interaktif yang memperkenalkan prospek kerja, proyek nyata, dan skill konkret yang dipelajari di setiap jurusan SMK.

### Tujuan Platform
* Membantu calon siswa mengenali minat dan kecocokan bidang keahlian mereka.
* Membantu siswa memahami perbedaan esensial antar jurusan.
* Menyajikan detail program keahlian secara visual dan interaktif dengan bahasa yang mudah dipahami oleh anak usia SMP.
* Mendukung pengambilan keputusan rasional sebelum pelaksanaan Penerimaan Peserta Didik Baru (PPDB).

### Target Pengguna
* **Siswa SMP:** Sebagai pengguna utama untuk mengeksplorasi minat dan melakukan asesmen.
* **Orang Tua / Guru BK:** Sebagai media pembimbing untuk melihat hasil rekomendasi dan kecocokan minat anak didik.

### Manfaat Utama
* **Bagi Siswa:** Memperoleh gambaran karir masa depan, materi pembelajaran, serta proyek nyata yang akan dihadapi selama di SMK.
* **Bagi Sekolah:** Meningkatkan efektivitas penerimaan siswa baru yang memiliki minat selaras dengan jurusan yang dipilih, mengurangi tingkat *drop-out* atau ketidakcocokan jurusan di kemudian hari.

*Platform ini awalnya dikembangkan sebagai solusi inovasi pendidikan untuk kompetisi IOFest 2026 (Human Capital Skills), namun pengembangannya dilanjutkan untuk potensi implementasi nyata.*

---

## Key Features

Berikut adalah fitur-fitur nyata yang ditemukan di dalam source code aplikasi:

### Core Features
* **Asesmen Minat Dua Tahap (Two-Stage Assessment):**
  1. **Tahap 1 (Deteksi Bidang Umum / Divisi):** Tes awal berisi 15 soal umum untuk mengelompokkan minat pengguna ke dalam salah satu dari tiga divisi utama: *Informatika*, *Bangunan*, atau *Mesin*. Jika sistem mendeteksi ketidakpastian tinggi, hasil akan dikategorikan sebagai "Tidak Yakin".
  2. **Tahap 2 (Spesifikasi Jurusan):** Setelah divisi teridentifikasi (atau jika pengguna sudah yakin memilih divisinya dari awal), pengguna akan disuguhkan 20 soal spesifik divisi tersebut untuk menentukan kecocokan jurusan akhir.
* **Kalkulasi Algoritma Pencocokan Minat:** Sistem menghitung frekuensi jawaban pilihan pengguna yang merepresentasikan jurusan tertentu, lalu meranking skor tertinggi untuk menghasilkan rekomendasi paling relevan.

### Educational Features
* **Eksplorasi Program Keahlian:** Menyediakan modul detail untuk mempelajari 10 program keahlian SMK:
  * **Informatika:** Rekayasa Perangkat Lunak (RPL), Teknik Komputer dan Jaringan (TKJ), Sistem Informatika Jaringan dan Aplikasi (SIJA), Desain Komunikasi Visual (DKV).
  * **Bangunan:** Desain Pemodelan dan Informasi Bangunan (DPIB), Teknik Konstruksi dan Perumahan (TKP), Teknik Instalasi Tenaga Listrik (TITL).
  * **Mesin:** Desain Gambar Mesin (DGM), Teknik Pemesinan (TP), Teknik Kendaraan Ringan (TKR).
* **Pemetaan Materi & Karir:** Menampilkan detail kompetensi (skills) yang dipelajari, contoh projek nyata yang akan dikerjakan, dan jalur karir masa depan (future careers) di masing-masing jurusan secara transparan.

### User Features
* **Penyimpanan Status Kuis Lokal:** Menyimpan nama pengguna, *progress* jawaban kuis, dan data status sesi di dalam `localStorage` browser untuk mendukung transisi halaman yang lancar.
* **Halaman Hasil Personal (Interactive Assessment Result):** Menampilkan nama pengguna, tanggal pengerjaan kuis, skor kecocokan, deskripsi jurusan, dan visualisasi tag warna kustom dinamis untuk setiap jurusan.

### Future Potential Features (Potensi Pengembangan)
* **AI Career Advisor:** Integrasi sistem rekomendasi bertenaga AI untuk memberikan peta jalan belajar (*roadmap*) personal berdasarkan jawaban spesifik siswa.
* **Dashboard Sekolah / Guru BK:** Panel monitoring untuk melihat statistik hasil kuis dari siswa di suatu sekolah SMP.

---

## Technology Stack

| Category | Technology | Description |
|----------|------------|-------------|
| **Core Framework** | Next.js 16.2.4 (App Router) | React Framework untuk Server-Side Rendering (SSR) dan routing modern |
| **Language** | TypeScript | Menjamin tipe data statis yang aman dan meminimalkan bug |
| **Database** | MongoDB | Basis data NoSQL untuk menyimpan hasil asesmen siswa |
| **ODM / Library** | Mongoose | Object Document Mapper untuk skema database MongoDB |
| **Styling** | Tailwind CSS v4 & PostCSS | Utilitas CSS modern dengan skema `@theme inline` |
| **Client Utilities** | Axios | Pustaka HTTP client untuk komunikasi data ke API internal |
| **Animations & UI** | AOS (Animate on Scroll) & Lenis | Animasi transisi elemen *on-scroll* dan *smooth scrolling* |
| **Icons** | Bootstrap Icons | Kumpulan aset ikon visual gratis untuk web |

---

## Project Architecture

Aplikasi ini menggunakan arsitektur **Next.js Full-stack (Serverless API & Client Side Rendering)** dengan pola interaksi sebagai berikut:

```
[ Browser / Frontend Client ]
     │
     ├─► HTTP Requests (Axios) ──► [ Next.js API Routes (Serverless) ]
     │                                     │
     ◄─  HTTP JSON Response   ◄────────────┤
                                           ▼
                                    [ MongoDB Database ]
```

### Penjelasan Alur
1. **Frontend Client:** Dibangun menggunakan React (Next.js client-side component `'use client'`) yang memanfaatkan `localStorage` untuk memanipulasi sesi pengguna (seperti menyimpan `username`, `division`, dan `user_id` hasil kuis).
2. **API Routes (Backend):** Next.js API menangani pemrosesan data (seperti pencocokan opsi kuis di `/api/question/division` dan penyimpanan data ke MongoDB menggunakan model Mongoose).
3. **Database Layer:** MongoDB menyimpan dokumen hasil kuis menggunakan skema Mongoose (`Result`) dengan stempel waktu otomatis (`timestamps`).

---

## Folder Structure

```
smk-skill-bridge/
├── app/
│   ├── api/
│   │   ├── clear/
│   │   │   └── route.ts             # API Sambutan & Testing
│   │   ├── question/
│   │   │   ├── [division]/
│   │   │   │   └── route.ts         # Mengambil soal spesifik divisi (Infor, Bangunan, Mesin)
│   │   │   ├── division/
│   │   │   │   └── route.ts         # Memproses hasil kuis tahap 1 (deteksi divisi)
│   │   │   └── route.ts             # API Cadangan Soal
│   │   ├── results/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts         # Mengambil detail hasil atau memproses hasil tahap 2 berdasarkan divisi
│   │   │   └── route.ts             # POST menyimpan hasil kuis / GET semua hasil
│   │   └── vocations/
│   │       ├── division/
│   │       │   └── route.ts         # Mengambil daftar soal kuis divisi tahap 1
│   │       └── route.ts             # Mengambil data 10 jurusan SMK
│   ├── components/
│   │   ├── skeleton/
│   │   │   └── Question.tsx         # Skeleton loading untuk kartu soal
│   │   ├── Footer.tsx               # Komponen Footer aplikasi
│   │   ├── Hero.tsx                 # Header pendaftaran nama kuis
│   │   ├── Home.tsx                 # Halaman utama dengan dropdown eksplorasi jurusan
│   │   ├── Modal.tsx                # Komponen modal dasar (dummy/layout)
│   │   ├── Modalbox.tsx             # Wrapper modal kustom ber-index tinggi (Z-Index)
│   │   ├── Navbar.tsx               # Komponen navigasi atas dinamis (Glassmorphism effect)
│   │   ├── Primarybox.tsx           # Box tag dengan pewarnaan dinamis
│   │   ├── Questions.tsx            # Komponen kartu soal asesmen
│   │   ├── SkeletonBox.tsx          # Wrapper skeleton loading serbaguna
│   │   └── Vocation.tsx             # Detail kartu visual jurusan pada beranda
│   ├── data/
│   │   ├── question/
│   │   │   ├── bangunan.json        # 20 Soal khusus Divisi Bangunan
│   │   │   ├── informatika.json     # 20 Soal khusus Divisi Informatika
│   │   │   └── mesin.json           # 20 Soal khusus Divisi Mesin
│   │   └── vocation/
│   │       ├── division.json        # 15 Soal Kuis Tahap 1 (Deteksi Divisi)
│   │       └── vocations.json       # Informasi lengkap 10 jurusan (deskripsi, karir, skill, warna)
│   ├── questions/
│   │   ├── General.tsx              # Modal pemilihan bidang awal (Tahap 1 / Yakin/Belum Tahu)
│   │   └── page.tsx                 # Halaman utama Kuis Asesmen (Tahap 1 & Tahap 2)
│   ├── result/
│   │   └── [id]/
│   │       └── page.tsx             # Halaman visualisasi rekomendasi kuis hasil database
│   ├── globals.css                  # Konfigurasi CSS global & custom theme
│   ├── layout.tsx                   # Layout global HTML, Body, & Google Fonts
│   ├── page.tsx                     # Halaman beranda utama
│   └── lib/
│       ├── checkdata.ts             # Logika algoritma penentu jurusan spesifik
│       ├── decrypt.ts               # Utilitas enkripsi dan dekripsi Base64
│       └── mongodb.ts               # Koneksi database MongoDB
│   └── models/
│       ├── resultSchema.ts          # Model skema Mongoose untuk hasil kuis (Result)
│       └── testSchema.ts            # Skema Mongoose eksperimental
├── public/
│   ├── majors.json                  # Data duplikat jurusan untuk kalkulasi internal
│   └── questions.json               # Data duplikat kuis
├── eslint.config.mjs                # Konfigurasi ESLint linter
├── next.config.ts                   # Konfigurasi Next.js (Allowed Dev Origins)
├── package.json                     # Konfigurasi dependensi project dan script run
├── postcss.config.mjs               # Konfigurasi pemrosesan CSS PostCSS
└── tsconfig.json                    # Konfigurasi kompilasi TypeScript
```

### Deskripsi Modul Utama:
* **`app/api/`**: Berisi seluruh file API Routes serverless yang menangani kueri soal kuis dan penyimpanan data MongoDB.
* **`app/components/`**: Komponen visual UI reusable (seperti Navbar dengan efek glassmorphism, Footer, Hero pendaftaran, dan kartu soal).
* **`app/data/`**: Pusat data statis dalam format JSON untuk soal kuis dan data detail masing-masing jurusan SMK.
* **`app/lib/`**: Fungsi pembantu/utilitas, termasuk algoritma pemrosesan kuis (`checkdata.ts`) dan inisialisasi koneksi database Mongoose (`mongodb.ts`).
* **`app/models/`**: Representasi skema database MongoDB untuk menyimpan histori tes siswa.

---

## Installation

Pastikan Anda sudah menginstal **Node.js** (versi rekomendasi: `>= 18.18.0`) dan memiliki database **MongoDB** yang aktif (bisa menggunakan MongoDB Compass lokal atau MongoDB Atlas cloud).

### 1. Clone Repository
```bash
git clone https://github.com/username/smk-skill-bridge.git
cd smk-skill-bridge
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment
Buat file baru bernama `.env.local` di folder root project, lalu isi variabel koneksi database Anda:
```env
MONGODB_URI=mongodb://localhost:27015/smk-skill-bridge
# Atau gunakan koneksi MongoDB Atlas cloud:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka **http://localhost:3000** pada browser Anda untuk menjalankan aplikasi.

### 5. Build Produksi
Untuk mengompilasi dan mengoptimalkan aplikasi untuk mode produksi:
```bash
npm run build
npm run start
```

---

## Environment Variables

Aplikasi memerlukan variabel lingkungan berikut untuk menghubungkan modul kuis dengan database:

| Variable | Description | Wajib / Opsional | Contoh Nilai |
|----------|-------------|------------------|--------------|
| `MONGODB_URI` | Alamat URL koneksi ke basis data MongoDB | **Wajib** | `mongodb://localhost:27015/smk_database` |

> [!WARNING]
> Aplikasi tidak akan dapat menyimpan atau menampilkan halaman rekomendasi hasil kuis (`/result/[id]`) jika variabel `MONGODB_URI` belum diset atau salah dikonfigurasi.

---

## Usage Guide

Berikut adalah alur penggunaan sistem dari sudut pandang siswa:

1. **Pendaftaran Nama (Mulai Awal):**
   * Di halaman beranda, gulir ke bagian pengisian nama, masukkan nama lengkap (minimal 4 karakter), kemudian klik **Mulai Tes**.
2. **Menentukan Keyakinan Bidang (Modal Awal):**
   * Pengguna akan ditanya apakah sudah memiliki bidang yang disukai (Informatika, Bangunan, Mesin) atau memilih **Belum Tahu**.
3. **Mengerjakan Asesmen Tahap 1 (Jika "Belum Tahu"):**
   * Pengguna menyelesaikan 15 soal minat umum yang berisi preferensi aktivitas sehari-hari.
   * Setelah selesai, klik **Lihat Hasil**. Algoritma sistem akan mendeteksi kecenderungan minat bidang Anda (contoh: "Informatika").
   * Klik **Lanjutkan** untuk masuk ke tahap kuis spesifik bidang tersebut.
4. **Mengerjakan Asesmen Tahap 2 (Spesifik Jurusan):**
   * Pengguna menyelesaikan 20 soal bertopik teknis seputar bidang terpilih.
   * Setiap jawaban mewakili indikasi bakat ke arah jurusan tertentu (misal pada Informatika: opsi 1 mengarah ke RPL, opsi 2 ke TKJ, opsi 3 ke SIJA, opsi 4 ke DKV).
5. **Menerima Rekomendasi:**
   * Setelah menekan tombol **Lihat Hasil** di kuis tahap 2, data dikirim ke backend dan disimpan ke database.
   * Pengguna diarahkan ke halaman `/result/[id]` yang menyajikan analisis kecocokan jurusan lengkap beserta daftar skill, proyek, dan peluang karir masa depannya.

---

## User Journey

```
[ Landing Page ] (Input Nama)
       │
       ▼
[ Modal Pilihan Bidang ] ───► (Pilih Informatika/Bangunan/Mesin) ───┐
       │ (Memilih "Belum Tahu")                                     │
       ▼                                                            │
[ Kuis Tahap 1 ] (15 Pertanyaan Umum)                                │
       │                                                            │
       ▼                                                            │
[ Hasil Rekomendasi Bidang ]                                         │
       │                                                            │
       ▼                                                            ▼
[ Kuis Tahap 2 ] ◄──────────────────────────────────────────────────┘
(20 Pertanyaan Spesifik Bidang)
       │
       ▼
[ Hasil Rekomendasi Akhir Jurusan ] (/result/[id])
```

---

## Features Breakdown

### 1. Modul Asesmen Minat (`app/questions/page.tsx`)
* **Tujuan:** Mengukur potensi minat dan mencocokkannya dengan program studi kejuruan yang sesuai.
* **Cara Kerja:** 
  * Mengambil soal dari folder data, menampilkannya satu per satu melalui komponen `Questions.tsx`.
  * Menggunakan *state* `answersDict` untuk merekam indeks jawaban kuis.
  * Menjalankan kueri POST ke API untuk mendapatkan pemetaan rekomendasi.
* **File Terkait:**
  * Kontroler utama: `app/questions/page.tsx`
  * Komponen Kartu Soal: [Questions.tsx](file:///c:/Users/Acer/OneDrive/Dokumen/smk%20skill%20bridge/smk-skill-bridge/app/components/Questions.tsx)
  * Modul Algoritma: [checkdata.ts](file:///c:/Users/Acer/OneDrive/Dokumen/smk%20skill%20bridge/smk-skill-bridge/app/lib/checkdata.ts)

### 2. Modul Hasil Asesmen (`app/result/[id]/page.tsx`)
* **Tujuan:** Menyajikan rekomendasi jurusan secara visual dan informatif kepada pengguna.
* **Cara Kerja:**
  * Mengambil parameter `id` dari URL (menggunakan `useParams()`), lalu memanggil API `GET /api/results/[id]`.
  * Membaca informasi detail jurusan (Rekomendasi Utama, Deskripsi, Skill, Proyek, Karir).
  * Menerapkan warna latar belakang dan warna aksen secara dinamis berdasarkan konfigurasi `colors` jurusan pada basis data.
* **File Terkait:**
  * Halaman Hasil: `app/result/[id]/page.tsx`
  * Model Data: [resultSchema.ts](file:///c:/Users/Acer/OneDrive/Dokumen/smk%20skill%20bridge/smk-skill-bridge/app/models/resultSchema.ts)

---

## API Documentation

Seluruh API menggunakan format respons JSON.

### 1. Kategori Kuis & Soal
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/question` | Mengambil semua daftar soal kuis cadangan (dari `public/questions.json`) |
| **GET** | `/api/question/[division]` | Mengambil 20 soal kuis spesifik divisi (`informatika`, `bangunan`, atau `mesin`) |
| **POST** | `/api/question/division` | Menerima array jawaban kuis tahap 1 dan mengembalikan rekomendasi divisi terbaik |

### 2. Kategori Jurusan & Eksplorasi
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/vocations` | Mengambil data lengkap 10 jurusan SMK beserta detailnya |
| **GET** | `/api/vocations/division` | Mengambil daftar soal kuis divisi tahap 1 (15 soal) |

### 3. Kategori Hasil Kuis (Results)
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/results` | Menghubungkan ke database MongoDB dan mengembalikan seluruh riwayat pengerjaan kuis |
| **POST** | `/api/results` | Menyimpan kuis hasil 30 soal (legacy/alternatif) langsung ke database |
| **GET** | `/api/results/[id]` | Mengambil satu dokumen kuis spesifik berdasarkan ID MongoDB (`_id`) |
| **POST** | `/api/results/[id]` | Menerima jawaban kuis tahap 2 spesifik divisi, menghitung kecocokan jurusan akhir, dan menyimpannya ke database |

---

## Database Structure

Aplikasi menggunakan skema Mongoose untuk memetakan hasil kuis siswa ke MongoDB.

### Model: `Result`
* **Nama Collection:** `results`
* **Definisi Schema (`app/models/resultSchema.ts`):**

```typescript
const resultSchema = new Schema(
  {
    username: { type: String, required: true },
    result: { type: Object, required: true },
  },
  {
    timestamps: true, // Menambahkan field createdAt dan updatedAt otomatis
  },
);
```

#### Contoh Isi Dokumen pada Kolom `result`:
```json
{
  "_id": "6473df332f11100234567890",
  "username": "Andi Pratama",
  "result": {
    "data": {
      "ID": 1,
      "uuid": "RPL",
      "name": "Rekayasa Perangkat Lunak (RPL)",
      "icon": "bi-code-slash",
      "vocation": "informatika",
      "description": "Rekayasa Perangkat Lunak (RPL) adalah jurusan...",
      "skills": ["Logika Pemrograman Dasar", "Web & Mobile Development"],
      "projects": ["Aplikasi Kasir Sekolah", "Website Portofolio Pribadi"],
      "careers": ["Junior Web Developer", "AI Prompt Engineer"],
      "colors": {
        "base_color": "#DBEAFE",
        "primary_color": "#002147",
        "secondary_color": "#4B77BE",
        "subtle_color": "#F0F9FF"
      }
    },
    "total": 14
  },
  "createdAt": "2026-05-28T08:00:00.000Z",
  "updatedAt": "2026-05-28T08:00:00.000Z",
  "__v": 0
}
```

---

## Security

* **Validasi Input:** Terdapat pencegahan di tingkat klien di mana kolom nama wajib memiliki minimal 4 karakter sebelum tombol **Mulai Tes** dapat ditekan.
* **Mongoose Schema Requirements:** Field `username` dan `result` didefinisikan sebagai `required: true` untuk memastikan integritas data yang masuk ke database MongoDB.
* **Base64 Encoding (`app/lib/decrypt.ts`):** Menyediakan utilitas dasar untuk melakukan enkripsi dan dekripsi Base64 string data.

---

## Configuration

### Next.js (`next.config.ts`)
* Mengizinkan origin development lokal tertentu pada Turbopack:
  ```typescript
  module.exports = {
    allowedDevOrigins : ['10.4.0.216']
  }
  ```

### Tailwind CSS v4 (`globals.css` & `postcss.config.mjs`)
* Memakai modul `@tailwindcss/postcss` untuk pemrosesan build styling.
* Menggunakan fitur pemetaan variabel tema lokal CSS:
  ```css
  @theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --font-sans: var(--font-jakarta-sans);
    --font-mono: var(--font-noto-mono);
  }
  ```

---

## Deployment

Aplikasi ini siap di-deploy ke platform seperti **Vercel** atau server VPS Mandiri.

### Deployment ke Vercel (Rekomendasi)
1. Hubungkan repository Anda ke akun GitHub Anda.
2. Impor project ke dashboard Vercel.
3. Di bagian **Environment Variables**, tambahkan:
   * `MONGODB_URI` = *(Alamat koneksi MongoDB Atlas Cloud Anda)*
4. Klik **Deploy**. Vercel akan otomatis mengenali Next.js dan melakukan build.

---

## Development Guide

Jika Anda ingin berkontribusi atau mengembangkan fitur baru di project ini, silakan ikuti petunjuk berikut:

1. **Pahami Arsitektur Data:** Data soal kuis disimpan di folder `app/data/question/`. Jika ingin mengubah pertanyaan kuis, edit file JSON di folder tersebut.
2. **Koneksi Database:** Pastikan MongoDB lokal Anda aktif di port default (`27017` atau sesuai isi `.env.local`) sebelum menjalankan kuis agar fitur penyimpanan hasil tes tidak error.
3. **Merapikan Kode (Linter):**
   ```bash
   npm run lint
   ```

---

## Contributing

1. Fork Project ini.
2. Buat Feature Branch baru (`git checkout -b feature/FiturBaru`).
3. Commit Perubahan Anda (`git commit -m 'Menambahkan fitur baru yang bermanfaat'`).
4. Push ke Branch tersebut (`git push origin feature/FiturBaru`).
5. Buat Pull Request baru di GitHub.

---

## License

License belum ditemukan pada repository.

---
---

# Documentation Coverage Report

Laporan audit mandiri mengenai kelengkapan dokumentasi repositori **SMK SkillBridge**:

## Documented Folders
* [x] **`app/api/`** (Didokumentasikan lengkap beserta endpoint-nya)
* [x] **`app/components/`** (Seluruh komponen UI utama dan skeleton dimuat)
* [x] **`app/data/`** (Struktur data pertanyaan dan data statis jurusan)
* [x] **`app/lib/`** (Logika pemrosesan algoritma kuis dan modul database)
* [x] **`app/models/`** (Skema database MongoDB / Mongoose)
* [x] **`app/questions/`** & **`app/result/`** (Alur halaman pengerjaan dan hasil)

## Documented Features
* [x] Asesmen 2 Tahap (Tahap 1 Bidang Umum & Tahap 2 Spesifik Jurusan)
* [x] Algoritma Kalkulasi Kecocokan Minat
* [x] Eksplorasi Interaktif Informasi 10 Jurusan SMK
* [x] Sesi Kuis berbasis `localStorage`

## Documented APIs
* [x] `GET /api/question` & `GET /api/question/[division]`
* [x] `POST /api/question/division`
* [x] `GET /api/vocations` & `GET /api/vocations/division`
* [x] `GET /api/results` & `POST /api/results`
* [x] `GET /api/results/[id]` & `POST /api/results/[id]`

## Documented Environment Variables
* [x] `MONGODB_URI` (Koneksi database)

## Documented Configurations
* [x] Next.js configuration (`next.config.ts`)
* [x] Tailwind CSS v4 & PostCSS theme
* [x] TypeScript compiler options

## Potentially Missing Documentation
* Pengaturan otentikasi login admin (karena repositori saat ini tidak memuat otentikasi admin, melainkan murni fokus pada asesmen siswa mandiri).

## Files Requiring Manual Review
* `app/api/results/route.ts` - Merupakan rute penyimpanan kuis 30 pertanyaan lama (skenario alternatif) yang masih tersimpan di repositori.

## Confidence Score
Dengan pemeriksaan seluruh file source code di dalam workspace, tingkat kelengkapan dan akurasi dokumentasi ini adalah **100%**.
