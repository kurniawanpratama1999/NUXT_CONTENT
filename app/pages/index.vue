<script setup>
import me from '@/assets/image/me_with_hat_cartoon_version.jpeg';

useSeoMeta({
  title: 'Browan Coding',
  description: 'Isinya cuma project dan dokumentasi dari Kurniawan Pratama',
});

definePageMeta({
  layout: 'default',
  pageTransition: false,
});

const { data: projects } = await useAsyncData(() => queryCollection('content').where('category', '=', 'project').all());

const arr = projects.value;

const icons = [
  {
    href: 'vscode-icons:file-type-vue',
    name: 'vue',
  },
  {
    href: 'vscode-icons:file-type-reactjs',
    name: 'reactjs',
  },
  {
    href: 'vscode-icons:file-type-nuxt',
    name: 'nuxt',
  },
  {
    href: 'vscode-icons:file-type-next',
    name: 'next',
  },
  {
    href: 'vscode-icons:file-type-java',
    name: 'java',
  },
  {
    href: 'vscode-icons:file-type-mysql',
    name: 'mysql',
  },
  {
    href: 'vscode-icons:file-type-excel2',
    name: 'excel',
  },
];
</script>

<template lang="html">
  <section id="hero" class="space-y-2 bg-[rgba(255,255,255,.5)] backdrop-blur-md px-2 py-6 rounded-lg">
    <img :src="me" alt="Kurniawan Pratama" class="size-40 rounded-full mx-auto" />
    <h2 class="text-center">
      <div class="text-xl font-bold text-emerald-800">Javascript</div>
      <div class="text-lg font-semibold text-emerald-900">Projek Maraton</div>
    </h2>
    <p class="text-center">
      "Website ini dikembangkan dengan NuxtJs — Ini adalah kali pertama gua membuat projek dengan Vue. Projek ini dibuat
      dengan tujuan sebagai sarana latihan dan tempat dokumentasi."
    </p>
    <h3 class="text-center text-xs text-slate-500">Daftar dokumentasi :</h3>
    <ul class="flex justify-center gap-3 flex-wrap">
      <li v-for="(icon, key) in icons" :key>
        <div class="p-2 aspect-square rounded-full bg-[rgba(255,255,255,.2)]">
          <Icon :name="icon.href" class="size-7 block" />
        </div>
      </li>
    </ul>
  </section>

  <section id="projects" class="bg-[rgba(255,255,255,.5)] backdrop-blur-md p-2 rounded-lg space-y-2">
    <div class="flex items-center gap-2 text-emerald-800">
      <Icon name="solar:code-linear" class="size-10" />
      <h2 class="font-semibold text-lg">Pengembangan Program</h2>
    </div>
    <p>
      "Tentu aja kalian semua bisa mencoba projeknya di akhir, harapan gua sih berjalan dengan mulus dan tidak ada error
      ketika digunakan, kalo kalian menemukan bug, DM aja di Sosial Media Instagram yang terletak di Navbar"
    </p>
    <p class="text-slate-500 text-xs">Daftar 4 Projek Terbaru :</p>
    <ul class="space-y-2">
      <li v-for="item in arr.filter((i, j) => j < 4)" :key="item.id">
        <NuxtLink :to="item.path" class="flex items-center gap-2">
          <Icon :name="item.icon" class="size-5" />
          <h3>{{ item.title }}</h3>
          <time class="ml-auto text-slate-500 italic text-xs">{{
            new Date(item.date).toLocaleDateString('id-ID')
          }}</time>
        </NuxtLink>
      </li>
    </ul>
  </section>

  <section id="blogs" class="py-6 px-2 flex flex-col gap-2">
    <div class="flex font-bold items-center gap-2 text-xl">
      <Icon name="uil:0-plus" class="size-8" />
      <h2 class="">Baca blog</h2>
      <span class="text-xs text-amber-500 underline">Coming Soon</span>
    </div>
    <p>
      "Ini mungkin sedikit aneh dan kurang penting, karna gua tidak terbiasa menulis panjang — tapi inilah gua, buat
      kalian yang penasaran aja."
    </p>
    <!-- <button class="px-6 py-2 border-amber-500 bg-amber-200 rounded-full text-xs font-bold w-fit self-end">Mari Membaca</button> -->
  </section>
</template>
