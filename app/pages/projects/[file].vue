<script setup>
    definePageMeta({
        layout: 'project',
    })

    const project = await useProject()
    const seo = computed(() => project.value.seo)    

    useSeoMeta(seo)
</script>   

<template lang="html">
    <ContentRenderer v-if="project" :value="project" tag="main" />
    <main v-else>{{ path }} not found</main>
</template>