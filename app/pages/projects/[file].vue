<script setup>
definePageMeta({
  layout: 'project',
});

const project = await useProject();

useSeoMeta({
  title: project.value.title,
  description: project.value.description,
});
</script>

<template lang="html">
  <ContentRenderer v-if="project" :value="project" tag="main" />
  <main v-else>{{ path }} not found</main>
</template>
