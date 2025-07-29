<script setup>
    definePageMeta({
        layout: 'project',
    })

    
    const path = useRoute().path
    const {data : project} = await useAsyncData(path, () => 
        queryCollection('content').path(path).first()
    )

    useSeoMeta(project.value.seo)

    const toc = project.value.body.toc.links
</script>

<template>
    <section id="information" class="border-b border-slate-500 pb-2 mb-2">
        <ul class="flex justify-between text-slate-600">
            <li>
                <span>Penulis : </span>
                <span>Kurniawan Pratama</span>
            </li>
            <li>
                <span>Dibuat : </span>
                <span>{{ new Intl.DateTimeFormat("id-ID", {dateStyle: "long"}).format(new Date(project.date)) }}</span>
            </li>
        </ul>
    </section>
    <article id="article-content">
        <h1 id="title" class="text-3xl font-bold capitalize">{{ project.title }}</h1>
        <p id="short-description" class="text-justify mb-5">{{ project.description }}</p>
        <section id="toc" class="p-5 mx-10 rounded-xl bg-indigo-200 mb-5">
            <h2 class="text-xl font-semibold">Daftar Isi :</h2>
            <ul id="toc-list" class="list-decimal pl-8">
                <li v-for="(item, key) in toc" :key>
                    <a :href="`#${item.id}`">{{ item.text }}</a>
                </li>
            </ul>    
        </section>
        <section class="main-content [&_p]:text-justify [&_p]:mb-5 [&_ul]:mb-5 [&_ol]:mb-5">
            <ContentRenderer v-if="project" :value="project"/>
            <p v-else>{{ path }} not found</p>
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
        font-size: 20px;
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

    .main-content table td, .main-content table th {
        border: 1px solid black;
        padding: 5px;
    }

</style>