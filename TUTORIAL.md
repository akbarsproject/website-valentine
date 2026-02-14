# Tutorial Valentine Website (Untuk Non-IT)

Tutorial ini dibuat supaya kamu bisa:
- Clone project pakai VS Code
- Edit konten Valentine
- Push ke GitHub
- Tayang di GitHub Pages

## 1) Persiapan (Sekali Saja)

Install aplikasi berikut:
- **VS Code**: https://code.visualstudio.com
- **Git**: https://git-scm.com/downloads
- **Node.js LTS**: https://nodejs.org/en/download

Setelah install, buka VS Code.

## 2) Clone Repository di VS Code

1. Buka VS Code  
2. Tekan **Ctrl+Shift+P**  
3. Ketik **Git: Clone** lalu Enter  
4. Masukkan link repo:
   ```
   https://github.com/akbarsproject/website-valentine.git
   ```
5. Pilih folder tempat menyimpan project  
6. Setelah selesai, klik **Open**  

## 3) Install Library

Di VS Code, buka Terminal:
- Menu **Terminal → New Terminal**

Lalu jalankan:
```
npm install
```

## 4) Jalankan Website (Preview)

Jalankan:
```
npm run dev
```

Lalu buka browser:
```
http://localhost:3000
```

## 5) Ubah Konten Valentine

Edit file utama di:
- `app/page.tsx`

Contoh yang sering diubah:
- Nama di intro
- Teks Love Letter

Ganti foto kenangan:
- File: `public/memory-photo.svg`
- Ganti dengan foto kamu, lalu ubah nama file jika perlu

Audio romantis:
- Taruh di `public/audio/romance.mp3`

## 6) Simpan Perubahan ke GitHub

Di Terminal VS Code:
```
git status
git add .
git commit -m "Update konten valentine"
git push
```

## 7) Tayang di GitHub Pages

Website ini sudah disiapkan otomatis untuk GitHub Pages.

Langkah:
1. Buka repo di GitHub  
2. Klik **Settings**  
3. Pilih **Pages**  
4. Di bagian **Build and deployment**, pilih **GitHub Actions**  
5. Tunggu proses selesai (sekitar 1-3 menit)  

Setelah sukses, link publiknya akan muncul di halaman **Pages**.

Contoh link:
```
https://akbarsproject.github.io/website-valentine/
```

## 8) Update Lagi di Masa Depan

Kalau mau update konten lagi:
1. Edit file
2. Jalankan:
   ```
   git add .
   git commit -m "Update konten"
   git push
   ```
3. GitHub Pages akan update otomatis

## Catatan Penting

- Jangan upload file rahasia seperti password atau API key.
- File `.env*` otomatis diabaikan oleh git.
