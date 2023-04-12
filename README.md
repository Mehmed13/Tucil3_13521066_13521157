# Tucil3_13521066_13521157 (Path Planner)

## Author
- Muhammad Fadhil Amri - 13521066
- Hanif Muhammad Zhafran - 13521157

## Description

Path planner merupakan aplikasi berbasis web untuk mencari rute terpendek dari beberapa landmark/marker yang sudah ditandai pada map. Aplikasi menggunakan algoritma UCS dan A* untuk mencari jalan terpendek antara 2 marker.

## Requirements

- npm v9.5.0
- Node.js v18.15.0
- VSCode
## Usage

### Setup
- Install extension Live Server oleh Ritwick Dey pada VSCode

### How to Use

- Pada VSCode, buka folder src. Kemudian buka file index.html
- Run aplikasi dengan cara menjalankan live server pada VSCode (ada di bawah kanan).
- Pilih algoritma pencarian yang diinginkan (A* atau UCS)
- Jika memilih input dari file, klik open file. Kemudian pilih file txt yang diinginkan. Setelah itu, tekan tombol Plot Data untuk menampilkan marker pada web.
- Jika ingin menggambar rute sendiri, dapat menggunakan cursor mode Marker, Path, dan Delete
- Marker mode digunakan untuk menambah marker baru
- Path mode digunakan untuk menambah jalur baru, caranya dengan menekan dua marker yang akan dihubungkan
- Delete mode digunakan untuk menghapus marker atau path. Jika ingin menghapus marker, langsung pencet marker saat berada dalam delete mode. Jika ingin menghapus path, langsung pencet path (garis kuning) saat berada dalam delete mode.
- Untuk mencari rute terdekat antara dua node, pilih cursor search mode. Kemudian pilih 2 marker yang akan dicari rutenya, marker yang pertama kali diklik merupakan start, marker yang terakhir diklik merupakan goal. Setelah pemencetan 2 marker, rute akan otomatis terbentuk dengan adanya rute berwarna merah.
- Untuk reset state (hapus semua marker dan path) dari map, tekan tombol reset state.