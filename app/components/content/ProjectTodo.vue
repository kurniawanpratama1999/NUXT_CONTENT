<script lang="ts" setup>
const { add, read, remove, update } = useTodo();

interface RecordData {
  id: number;
  task: string;
  memo: number | null;
  isUpdate: Boolean;
  filter: string;
}

const record = reactive<RecordData>({
  id: 0,
  task: '',
  memo: null,
  isUpdate: false,
  filter: '',
});

record.id += 1;
add({ id: 1, task: 'One' });

record.id += 1;
add({ id: 2, task: 'Two' });

record.id += 1;
add({ id: 3, task: 'Three' });

record.id += 1;
add({ id: 4, task: 'Four' });

record.id += 1;
add({ id: 5, task: 'Five' });

const getTodos = computed(() => {
  let result: Todo[] = read().sort((a, b) => b.id - a.id);

  switch (record.filter) {
    case 'date':
      return result.sort((a, b) => b.createAt.getTime() - a.createAt.getTime());
    case 'done':
      return result.sort((a, b) => Number(b.done) - Number(a.done));
    case 'not':
      return result.sort((a, b) => Number(a.done) - Number(b.done));
    default:
      return result;
  }
});

const handleNewOrUpdateTask = () => {
  if (record.isUpdate) {
    update({ id: record.memo, task: record.task });
    record.task = '';
    record.memo = null;
    record.isUpdate = false;
  } else {
    record.id += 1;
    add({ id: record.id, task: record.task });
    record.task = '';
  }
};
const updatePopup = (todo: Pick<Todo, 'id' | 'popup'>) => {
  update(todo);
};
const handleControlSelect = (todo: Pick<Todo, 'id' | 'done'>) => {
  update(todo);
};
const handleControlUpdate = (todo: Pick<Todo, 'id' | 'task'>) => {
  record.isUpdate = true;
  record.memo = todo.id;
  record.task = todo.task;
};
const handleControlDelete = (todo: Pick<Todo, 'id'>) => {
  remove(todo);
};
const taskTotal = computed<number>(() => read().length);

const taskDone = computed<number>(() => read().filter((item) => item.done).length);
const taskUndone = computed<number>(() => read().filter((item) => !item.done).length);
</script>
<template lang="html">
  <form
    @submit.prevent="() => handleNewOrUpdateTask()"
    class="w-[300px] mx-auto rounded-2xl p-5 space-y-2 bg-[rgba(255,255,255,.3)]">
    <h3 class="text-center">TODO APP V1</h3>

    <div
      id="information"
      class="flex gap-2 [&_div]:basis-full [&_div]:aspect-square [&_div]:border-1 [&_div]:rounded-xl">
      <div
        id="totalOfTask"
        class="flex items-center justify-center font-mono border-blue-500 text-blue-800 bg-blue-200">
        {{ taskTotal }}
      </div>
      <div
        id="totalDone"
        class="flex items-center justify-center font-mono border-green-500 text-green-800 bg-green-200">
        {{ taskUndone }}
      </div>
      <div id="totalNot" class="flex items-center justify-center font-mono border-red-500 text-red-800 bg-red-200">
        {{ taskDone }}
      </div>
    </div>

    <div id="filter">
      <select
        v-model="record.filter"
        name="filter-task"
        id="filter-task"
        class="w-full p-1 border-1 border-slate-500 rounded-xl text-center">
        <option value="">-- filter --</option>
        <option value="date">By Date</option>
        <option value="done">By Done Task</option>
        <option value="not">By Not Done Task</option>
      </select>
    </div>

    <div id="list" class="p-2 m-0 flex flex-col gap-3 max-h-[180px] overflow-y-auto">
      <div
        v-for="item in getTodos"
        :key="item.id"
        @click="updatePopup({ id: item.id, popup: item.popup })"
        :class="[
          item.done ? 'bg-red-200 border-red-500' : 'bg-green-200 border-green-500',
          'p-2 border-x-4 relative text-xs',
        ]">
        <div
          v-if="item.popup"
          :class="[
            'control absolute top-0 right-0 bottom-0 w-fit',
            item.done ? 'bg-red-500' : 'bg-green-500',
            'flex items-center justify-center gap-3 px-3',
          ]">
          <button
            type="button"
            @click="handleControlSelect({ id: item.id, done: item.done })"
            class="bg-orange-500 size-5 rounded-full text-xs border border-orange-300" />
          <button
            type="button"
            @click="handleControlUpdate({ id: item.id, task: item.task })"
            class="bg-blue-500 size-5 rounded-full text-xs border border-blue-300" />
          <button
            type="button"
            @click="handleControlDelete({ id: item.id })"
            class="bg-red-500 size-5 rounded-full text-xs border border-red-300" />
        </div>
        <span>
          {{ item.task }}
        </span>
      </div>
    </div>

    <div id="inputs" class="flex gap-2">
      <label for="task" class="flex">
        <input
          type="text"
          name="task"
          v-model="record.task"
          class="w-full border border-slate-500 rounded-lg p-1 outline-0" />
      </label>
      <button type="submit" class="border border-slate-500 rounded-lg px-3 py-1">
        {{ record.isUpdate ? 'Update' : 'New' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
#list p {
  margin: 0;
}
</style>
