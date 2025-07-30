<script setup>
    const path = useRoute().path
    
    const {data : projects} = await useAsyncData(() => 
    queryCollection("content").where("category", "=", "project").all())

    const slots = useSlots()
</script>

<template>
    <aside class="space-y-2 [&_section]:bg-[rgba(255,255,255,.4)] [&_section]:px-2 [&_section]:py-6 [&_section]:rounded-lg">
        <section>
            <h6 class="mb-2 text-lg font-bold text-center">Try it Bro</h6>
            <slot/>
        </section>

        <section>
            <h2 class="font-bold text-lg">Check The List</h2>
            <ul class="list-disc pl-6">
                <li v-for="(item, key) in projects.filter(item => item.path !== path)" :key>
                    <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
                </li>
            </ul>
        </section>
    </aside>
</template>