<script setup>
    definePageMeta({
        layout: 'project',
    })

    const path = useRoute().path

    const {data: project} = await useAsyncData(path, () => 
        queryCollection('content').path(path).first())

    const ProjectTOC = project.value.body.toc.links
        
    const {data: projects} = await useAsyncData(() => 
        queryCollection('content').where('category','=','project').all())
        
    useSeoMeta(project.value.seo)
</script>   

<template lang="html">
    <main class="space-y-2">
        <section id="information" class="text-xs font-bold italic text-slate-600 bg-[rgba(255,255,255,.4)] p-2 rounded-lg">
            <ul class="text-left space-y-1">
                <li>
                    <span>Author: </span>
                    <span>Kurniawan Pratama</span>
                </li>
                <li>
                    <span>Dibuat: </span>
                    <span>{{ new Intl.DateTimeFormat("id-ID", {dateStyle: "long"}).format(new Date(project.date)) }}</span>
                </li>
            </ul>
        </section>
        <article id="article-content" class="space-y-2">
            <div class="bg-[rgba(255,255,255,.4)] p-2 rounded-lg">
                <h1 id="title" class="text-xl font-bold text-emerald-800">{{ project.title }}</h1>
                <p id="short-description" class="">{{ project.description }}</p>
            </div>
            <section id="toc" class="bg-[rgba(255,255,255,.4)] p-2 rounded-lg">
                <h2 class="font-bold text-lg text-blue-800">Daftar Isi :</h2>
                <ol id="toc-list" class="list-decimal pl-8">
                    <li v-for="(item, key) in ProjectTOC" :key>
                        <a :href="`#${item.id}`">{{ item.text }}</a>
                    </li>
                </ol>    
            </section>
            <section :class="['main-content','bg-[rgba(255,255,255,.4)] p-2 rounded-lg', 'pb-5']">
                <ContentRenderer v-if="project" :value="project"/>
                <p v-else>{{ path }} not found</p>
            </section>
        </article>
    </main>
    <aside id="widget">
        <section class="bg-[rgba(255,255,255,.4)] p-2 rounded-lg">
            <h2 class="font-bold text-lg">Check The List</h2>
            <ul class="list-disc pl-6">
                <li v-for="(item, key) in projects.filter(item => item.path !== path)" :key>
                    <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
                </li>
            </ul>
        </section>
    </aside>
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
        color: rgb(0, 15, 97)
    }

    .main-content p,
    .main-content table,
    .main-content ul,
    .main-content ol {
        margin-bottom: 16px;
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