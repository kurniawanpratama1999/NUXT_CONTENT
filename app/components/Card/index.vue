<script setup>
    defineProps({
        item: Array,
        bgcolor: String,
    })
</script>
<template>
    {{ console.log(item)}}
    <ul>
        <li v-for="item in item" :key="item.path">
            <NuxtLink :to="item.path">
                <span>{{ item.title }}</span>
                <span>{{ item.description }}</span>
            </NuxtLink>
        </li>
    </ul>
</template>