import TodoModel from "./Todomodel"

export default class TodoControl {
    #todos = ref([])

    add({id, task}) {
        this.#todos.value.push(new TodoModel({id, task}))
    }

    update({id, task, isDone, isPopup}) {
        const findID = this.#todos.value
        .map(item => item.state)
        .find(item => item.id === id)

        if (!findID) return false;

        if (task !== undefined) (findID.task = task);
        if (isDone !== undefined) (findID.done = isDone);
        if (isPopup !== undefined) (findID.popup = isPopup);
        return true
    }

    read(){
        return this.#todos.value.map(item => item.state)
    }

    delete({id}){
        this.#todos.value = this.#todos.value.filter(item => item.id !== id)
    }
}