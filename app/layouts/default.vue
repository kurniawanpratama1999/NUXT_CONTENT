<template>
	<div id="default" :class="[
		'text-sm p-2',
		'min-h-dvh',
		'bg-gradient-to-r from-emerald-300 to-indigo-300',
		'grid grid-cols-1 grid-rows-[auto_1fr] gap-2',
		]">
		<Navbar/>
		<main id="main" class="min-h-full grid auto-rows-auto gap-2">
			<slot/>
		</main>
	</div>
</template>