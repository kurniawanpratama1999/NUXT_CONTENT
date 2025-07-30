<script setup>
	const {data: projects} = await useAsyncData(() => 
	queryCollection('content').where("category", '=', 'project').all())
</script>

<template lang="html">
	<div id="project" :class="[
		'text-sm p-2',
		'min-h-dvh',
		'bg-gradient-to-r from-emerald-300 to-indigo-300',
		'grid grid-cols-1 grid-rows-[auto_1fr] gap-2',
		]">
		<Navbar/>
		<slot/>
	</div>
</template>