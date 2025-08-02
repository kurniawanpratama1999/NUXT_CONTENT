<script setup>
    const props = defineProps({
        idName: {type: String, default: "textarea"},
        cLabel: {type: String, default: "label"},
        cInput: {type: String, default: "area"},
        holder: {type: String, default: 'Placeholder'}
    })

    const areaModel = defineModel()

    const textareaRef = ref(null)

    const fieldSpan = computed(() => props.idName.split("-").join(" "))

    const autoResize = () => {
        const el = textareaRef.value
        if (el) {
            el.style.height = 'auto' // reset dulu
            el.style.height = el.scrollHeight + 'px' // sesuaikan ke content
        }
    }

    watch(areaModel, () => {
        nextTick(() => autoResize())
    })

    onMounted(() => {
        autoResize()
    })
    
</script>

<template>
    <label :for="idName" :class="['flex flex-col',cLabel]">
        <span class="capitalize">{{ fieldSpan }}</span>
        <slot/>
        <textarea 
            ref="textareaRef"
            :name="idName" 
            :id="idName" 
            :class="['border px-3 py-2',cInput]"
            v-model="areaModel"
            :placeholder="holder"
            ></textarea>
    </label>
</template>