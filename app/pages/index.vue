<script setup>
    import me from '@/assets/image/me_with_hat_cartoon_version.jpeg'

    
    definePageMeta({
      layout: 'default'
    })
    
    const {data : projects} = await useAsyncData(() => 
    queryCollection('content')
    .where("category", "=", "project").all()
  )
  
    const arr = projects.value
    
    const icons = [
      {
        href: "vscode-icons:file-type-vue",
        name: "vue"
      },
      {
        href: "vscode-icons:file-type-reactjs",
        name: "reactjs"
      },
      {
        href: "vscode-icons:file-type-nuxt",
        name: "nuxt"
      },
      {
        href: "vscode-icons:file-type-next",
        name: "next"
      },
      {
        href: "vscode-icons:file-type-java",
        name: "java"
      },
      {
        href: "vscode-icons:file-type-mysql",
        name: "mysql"
      },
      {
        href: "vscode-icons:file-type-excel2",
        name: "excel"
      },
  ]

</script>

<template>
  <section id="hero" class="md:row-start-1 md:row-end-3 bg-slate-200 p-5 rounded-xl space-y-5 border-t-2 border-blue-700">
    <div id="image-me" class="border border-slate-500 size-40 rounded-full mx-auto overflow-hidden">
      <img :src="me" alt="Kurniawan Pratama">
    </div>
    <h2 class="text-center text-2xl font-bold">
        <span class="block">Javascript</span>
        <span class="block">Projek Maraton</span>
    </h2>
    <p class="text-center">"Website ini dikembangkan dengan NuxtJs — Ini adalah kali pertama gua membuat projek dengan Vue. Projek ini dibuat dengan tujuan sebagai sarana latihan dan tempat dokumentasi."</p>
    <ul class="flex gap-y-5 gap-x-10 justify-center flex-wrap">
      
      <li v-for="(icon, key) in icons" :key>
        <div class="bg-slate-100 rounded-full size-14 flex items-center justify-center" :title="icon.name">
          <Icon :name="icon.href" size="2rem"/>
        </div>
      </li>

    </ul>
  </section>
  
  <section id="projects" class="bg-slate-200 p-5 border-t-2 border-red-700 rounded-xl space-y-5">
    <div class="wrapper border-b border-slate-500 pb-4 grid grid-cols-[auto-1fr] gap-x-5 items-center">
      <div id="projects-image" class="size-40 rounded-full row-start-1 row-end-3 col-start-1 col-end-2 flex items-center justify-center">
        <Icon name="solar:code-linear" size="10rem" class="border block"/>
      </div>
      <h2 class="text-2xl font-bold row-start-1 row-end-2">Pengembangan Program Penyalur Hobi</h2>
      <p class="row-start-2 row-end-3">"Tentu aja kalian semua bisa mencoba projeknya di akhir, harapan gua sih berjalan dengan mulus dan tidak ada error ketika digunakan, kalo kalian menemukan bug, DM aja di Sosial Media Instagram yang terletak di Navbar"</p>
    </div>
    <ul class="grid md:grid-cols-3 grid-cols-2 gap-5">
        <li v-for="item in arr.filter((i, j) => j < 12)" :key="item.id">
          <div class="grid grid-cols-[auto_1fr] items-center gap-x-2">
            <div class="row-span-2 col-start-1 col-end-2">
              <Icon :name="item.icon" size="3rem"/>
            </div>
            <NuxtLink :to="item.path" class="font-bold capitalize">{{ item.title }}</NuxtLink>
            <span class="text-xs text-slate-600 italic">{{ new Date(item.date).toLocaleDateString("id-ID") }}</span>
          </div>
        </li>
    </ul>
  </section>

  <section id="blogs" class="bg-slate-200 p-5 border-t-2 border-green-700 rounded-xl">
    <div class="grid grid-cols-[auto_1fr] items-center gap-x-5">
        <div class="col-start-1 col-end-2"><Icon name="ri:glasses-fill" size="5rem"/></div>
        <h2 class="text-2xl font-bold col-start-2 col-end-3">Baca blog biar tahu siapa gua</h2>
        <p class="col-start-1 col-end-3">"Ini mungkin sedikit aneh dan kurang penting, karna gua tidak terbiasa menulis panjang — tapi inilah gua, buat kalian yang penasaran aja."</p>
    </div>
  </section>
</template>
