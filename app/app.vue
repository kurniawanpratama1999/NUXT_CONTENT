<script setup>
import me from "@/assets/image/me.png"

  useHead({
    link: [{rel: "icon", type: "image/x-icon", href:me}]
  })
</script>

<template lang="html">
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>