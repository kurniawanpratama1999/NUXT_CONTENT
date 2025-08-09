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
  <ContentRenderer
    v-if="project"
    :value="project"
    tag="main"
    :class="['lg:grid lg:grid-cols-[1fr_1fr_1fr] lg:gap-3']" />
  <main v-else>{{ path }} not found</main>
</template>
