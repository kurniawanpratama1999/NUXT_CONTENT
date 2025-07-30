<template lang="html">
  <div class="bg-slate-900 rounded-xl p-2 mb-5 text-xs">
    <div
        v-if="$props.filename"
        class="text-slate-300"
        >
        //{{ filename }}
    </div>
    <pre
    :class="{
    [$props.class]: true,
    'px-5 py-2 overflow-x-auto':$props.filename,
    }" ref="pre">
        <slot />
    </pre>
</div>
</template>

<script setup lang="js">

const props = defineProps({
  code: String,
  language: String,
  filename: String,
  highlights: Array,
  meta: String,
  class: String,
});

const pre = ref(null)


onMounted(() => {
    const trimPre = pre.value.innerHTML.trim()
    pre.value.innerHTML = trimPre
})
</script>

<style>
pre code .line {
  display: block;
}

</style>