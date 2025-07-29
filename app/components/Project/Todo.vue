<script setup>
    import TodoControl from '~/utils/Class/Todocontrol';

    const todo = new TodoControl();


    const record = reactive({
        id : 6,
        task : "",
        memo : "",
        isUpdate : false,
        filter: "",
    })

    const todos = computed(() => {
        let result = todo.read().sort((a,b) => b.id - a.id)

        switch (record.filter) {
            case "date": return result.sort((a, b) => b.date - a.date)
            case "done": return result.sort((a, b) => b.done - a.done)
            case "not": return result.sort((a, b) => a.done - b.done)
            default: return result
        }

    })

    todo.add({id: 1, task: "first"})
    todo.add({id: 2, task: "second"})
    todo.add({id: 3, task: "third"})
    todo.add({id: 4, task: "fourth"})
    todo.add({id: 5, task: "fifth"})
    todo.add({id: 6, task: "sixth"})

    // CONTROL
    const handleNewOrUpdateTask = () => {
        if (record.isUpdate) {
            console.log(record.memo)
            todo.update({id: record.memo, task: record.task})
            record.task = ""
            record.memo = ""
            record.isUpdate = false
        } else {
            record.id += 1;
            todo.add({id: record.id, task: record.task})
            record.task = ""
        }
    }

    const updatePopup = (id, popup) => {
        todo.update({id, isPopup: !popup})
    }
    
    const handleControlSelect = (id, done) => {
        todo.update({id, isDone: !done})
    }

    const handleControlUpdate = (id, task) => {
        record.isUpdate = true
        record.memo = id
        record.task = task
    }

    const handleControlDelete = (id) => {
        todo.delete({id})
    }


</script>

<template>
    <form @submit.prevent="() => handleNewOrUpdateTask()" class="border border-slate-500 w-[300px] mx-auto rounded-2xl p-5 space-y-2">
        <h3 class="text-center">TODO APP V1</h3>
        <div id="information" class="flex gap-2 [&_div]:basis-full [&_div]:aspect-square [&_div]:border-1 [&_div]:rounded-xl">
            <div id="totalOfTask" class="flex items-center justify-center font-mono border-blue-500 text-blue-800 bg-blue-200">10</div>
            <div id="totalDone" class="flex items-center justify-center font-mono border-green-500 text-green-800 bg-green-200">5</div>
            <div id="totalNot" class="flex items-center justify-center font-mono border-red-500 text-red-800 bg-red-200">5</div>
        </div>
        <div id="filter">
            <select v-model="record.filter" name="filter-task" id="filter-task" class="w-full p-1 border-1 border-slate-500 rounded-xl text-center">
                <option value="">-- filter --</option>
                <option value="date">By Date</option>
                <option value="done">By Done Task</option>
                <option value="not">By Not Done Task</option>
            </select>
        </div>
        <div id="list" class="p-2 m-0 flex flex-col gap-3 max-h-[180px] overflow-y-auto">
            <p v-for="item in todos" :key="item.id" @click="updatePopup(item.id, item.popup)" :class="[item.done ? 'bg-red-200 border-red-500':'bg-green-200 border-green-500', 'p-2 border-x-4 relative text-xs']">
                <div v-if="item.popup" :class="['control absolute top-0 right-0 bottom-0 w-fit',item.done ? 'bg-red-500' : 'bg-green-500', 'flex items-center justify-center gap-3 px-3']">
                    <button type="button" @click="handleControlSelect(item.id, item.done)" class="bg-orange-500 size-5 rounded-full text-xs border border-orange-300"></button>
                    <button type="button" @click="handleControlUpdate(item.id, item.task)" class="bg-blue-500 size-5 rounded-full text-xs border border-blue-300"></button>
                    <button type="button" @click="handleControlDelete(item.id)" class="bg-red-500 size-5 rounded-full text-xs border border-red-300"></button>
                </div>
                <span>{{ item.task }}</span>
            </p>
        </div>
        <div id="inputs" class="flex gap-2">
            <label for="task" class="flex">
                <input type="text" name="task" v-model="record.task" class="w-full border border-slate-500 rounded-lg p-1 outline-0">
            </label>
            <button type="submit" class="border border-slate-500 rounded-lg px-3 py-1">{{ record.isUpdate  ? "Update" : "New" }}</button>
        </div>
    </form>
</template>
<style scoped>
    #list p {
        margin: 0
    }
</style>