<template>
	<div id="default" class="bg-slate-300 min-h-[100vh] sm:max-h-[100vh] grid grid-cols-1 grid-rows-[auto_1fr] gap-5 p-5">
		<Navbar/>
		<main class="grid md:grid-cols-[1fr_2fr] grid-cols-1 md:grid-rows-[2fr_1fr] gap-5">
			<slot/>
		</main>
	</div>
</template>