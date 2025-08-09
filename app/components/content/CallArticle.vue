<script setup>
defineProps({
  title: String,
  description: String,
  date: String,
});

const project = await useProject();
const toc = computed(() => project.value.body.toc.links);
const data = computed(() => {
  return {
    title: project.value.title,
    description: project.value.description,
    date: project.value.date,
  };
});
</script>

<template>
  <article
    id="main-article"
    :class="[
      'lg:col-start-1 lg:col-end-3 relative',
      'space-y-2 mb-2 [&_section]:bg-[rgba(255,255,255,0.4)] [&_section]:px-4 [&_section]:py-6 [&_section]:rounded-lg',
    ]">
    <section id="information" class="text-xs font-bold italic text-slate-600">
      <ul class="text-left space-y-1">
        <li>
          <span>Author: </span>
          <span>Kurniawan Pratama</span>
        </li>
        <li>
          <span>Dibuat: </span>
          <span>{{ new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(data.date)) }}</span>
        </li>
      </ul>
    </section>

    <section id="title">
      <h1 class="text-xl font-bold text-emerald-800">{{ data.title }}</h1>
      <p>{{ data.description }}</p>
    </section>

    <section id="toc">
      <h2 class="font-bold text-lg text-blue-800">Daftar Isi :</h2>
      <ol id="toc-list" class="list-decimal pl-8">
        <li v-for="(item, key) in toc" :key>
          <a :href="`#${item.id}`">{{ item.text }}</a>
        </li>
      </ol>
    </section>

    <section class="main-content">
      <slot />
    </section>
  </article>
</template>

<style>
.main-content h2,
.main-content h3,
.main-content h4,
.main-content h5,
.main-content h6,
.main-content h1 {
  font-weight: bold;
  font-size: 16px;
  color: rgb(0, 15, 97);
}

.main-content p,
.main-content table,
.main-content ul,
.main-content ol {
  margin-bottom: 16px;
}

.main-content ul li p,
.main-content ol li p {
  margin-bottom: 0;
}

.main-content #write p {
  margin-bottom: 0;
}

.main-content .tiptap {
  padding: 5px;
  outline: 0;
}

.main-content ol {
  padding-left: 40px;
}

.main-content ul {
  padding-left: 15px;
}

.main-content ul {
  list-style-type: disc;
}

.main-content ol {
  list-style-type: decimal;
}

.main-content table {
  margin: 0px auto;
  margin-bottom: 20px;
}

.main-content table td,
.main-content table th {
  border: 1px solid black;
  padding: 5px;
}
</style>
