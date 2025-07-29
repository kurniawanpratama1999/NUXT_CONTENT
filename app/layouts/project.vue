<script setup>
	const path = useRoute().path
	const {data: projects} = await useAsyncData(() => 
	queryCollection('content').where("category", '=', 'project').all())
</script>

<template>
	<div id="project" class="bg-slate-300 min-h-[100vh] grid md:grid-cols-[3fr_1fr] grid-cols-1 grid-rows-[auto_1fr] gap-5 p-5">
		<Navbar class="md:col-start-1 md:col-end-3"/>
		<main class="bg-slate-200 rounded-xl p-5 border-t-2 border-red-500">
			<slot/>
		</main>
		<aside id="left-side-of-project-list">
			<section class="bg-slate-200 p-5 rounded-xl border-t-2 border-purple-600">
				<h2 class="text-xl font-bold">Check The List</h2>
				<ul class="list-disc pl-4">
					<li v-for="(item, key) in projects.filter(item => item.path !== path)" :key>
						<NuxtLink>{{ item.title }}</NuxtLink>
					</li>
				</ul>
			</section>
		</aside>
	</div>
</template>