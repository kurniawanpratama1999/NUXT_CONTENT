<template lang="html">
  <div id="pre-wrapper" class="bg-slate-900 rounded-xl p-2 mb-5 text-xs">
    <div v-if="$props.filename" class="text-slate-300">//{{ filename }}</div>
    <pre :class="[$props.class, { 'px-5 py-2 overflow-x-scroll': $props.filename }]">
        <slot />
    </pre>
  </div>
</template>

<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});
</script>

<style>
pre code .line {
  display: block;
}
</style>
