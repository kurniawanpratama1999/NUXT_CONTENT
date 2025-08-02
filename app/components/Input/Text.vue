<script setup>
    const props = defineProps({
        idName: {type: String, default: "input"},
        cLabel: {type: String, default: "label"},
        cInput: {type: String, default: "input"},
        holder: {type: String, default: 'Placeholder'}
    })

    const textModel = defineModel()

    const fieldSpan = computed(() => props.idName.split("-").join(" "))
</script>

<template>
    <label :for="idName" :class="['flex flex-col',cLabel]">
        <span class="capitalize">{{ fieldSpan }}</span>
        <slot/>
        <input 
            type="text" 
            :name="idName" 
            :id="idName" 
            :class="['border px-3 py-2',cInput]"
            :placeholder="holder"
            v-model="textModel">
    </label>
</template>