<script setup>
import me from '@/assets/image/me.png';

// const showLoading = ref(false);

useHead({
  link: [{ rel: 'icon', type: 'image/x-icon', href: me }],
});
</script>

<template lang="html">
  <NuxtLayout>
    <NuxtPage />
    <!-- <LoadingOverlay :is-show="showLoading" /> -->
  </NuxtLayout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
