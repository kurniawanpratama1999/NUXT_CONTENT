<script setup>
const transition = ref(false);
</script>

<template lang="html">
  <div
    id="project"
    :class="[
      'text-sm p-2',
      'min-h-dvh',
      'bg-gradient-to-l from-emerald-300 to-indigo-300',
      'grid grid-cols-1 grid-rows-[auto_1fr] gap-2',
    ]">
    <Navbar />
    <slot />
  </div>
</template>
