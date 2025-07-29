---
title: Todo App
description: Projek Todo akan ditulis dengan basis OOP (Object Oriented Programming). Hal ini dilakukan agar mudah dikelola, dibaca, dan dikembangkan, sehingga dimasa yang akan datang projek ini akan bertambah fitur dan kegunaannya.
date: 2025-07-22
icon: solar:checklist-minimalistic-outline
category: project
tags:
- project
- todo
- easy
- vue
- nuxt
---

Hello Worlds, gua menekankan OOP pada projek ini sebagai latihan dan cara termudah untuk mengembangkan fitur pada projek yang sudah jadi. Sebagai informasi tambahan, karna gua menggunakan NuxtJs, maka file class gua letakan di folder (utils/Class/...) dimana terdapat 2 file Class, yaitu TodoModel akan berfungsi sebagai blueprint si todo dan TodoControl akan menjadi alat untuk sebuah fitur. 

## Bagaimana Todo App Bekerja ?
Pada bagian pertama dari projek ini adalah membuat class model (TodoModel) yang berfungsi sebagai blueprint si aplikasi todo-nya, sebagai contoh diaplikasi todo ini gua akan memberikan user kemampuan untuk mencatat tugas, tanggal, dan apakah tugas ini sudah selesai atau belum.

Pada bagian kedua, user akan memiliki kemampuan dasar untuk melakukan Create, Read, Update, dan Delete (CRUD) pada tugas yang sudah dibuatnya atau bisa gua sebut sebagai fitur, dan disinilah tempat dimana fitur akan dikembangkan, karna pada baris awal penulisan akan digunakan untuk menyimpan data tugas.

Pada bagian ketiga, gua bisa sebut sebagai main (utama) dan ini adalah tempat untuk mempublish bagian control yang dimiliki oleh todo app, sehinnga user mampu menggunakannya.

## Fitur Apa Saja yang disediakan ?
Berikut adalah fitur saat ini:

1. Buat tugas baru. 
2. Update tugas yang sudah ada, seperti update nama tugasnya, atau update apakah tugas sudah selesai atau belum.
3. Menghapus tugas yang sudah ada.
4. Menampilkan tugas berdasarkan:
   - tugas yang sudah selesai.
   - tugas belum selesai.
   - tanggal terbaru.
   - tanggal paling lama.
5. User juga bisa memilih ingin menampilkan tugas selesai atau tugas belum selesai saja.
6. Terdapat box informasi terhadap jumlah tugas yang sudah dibuat dan jumlah tugas yang sudah selesai atau belum.

## Berikut Tampilan Program Todo App yang Sudah dibuat

<ProjectTodo/>
