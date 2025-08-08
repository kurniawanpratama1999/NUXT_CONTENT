export interface Todo {
  id: number;
  task: string;
  done: boolean;
  popup: boolean;
  createAt: Date;
  updatedAt: Date;
}

export default function () {
  const todos = reactive<Todo[]>([]);

  const add = (todo: Pick<Todo, 'id' | 'task'>) => {
    const now = new Date();
    todos.push({ ...todo, done: false, popup: false, createAt: now, updatedAt: now });
  };

  const update = (todo: Partial<Omit<Todo, 'id'>> & { id: number | null }): boolean => {
    const getTodoByID = todos.find((todoValue) => todoValue.id === todo.id);
    if (!getTodoByID) return false;

    if (todo.task !== undefined) {
      getTodoByID.task = todo.task;
    }

    if (todo.done !== undefined) {
      getTodoByID.done = !todo.done;
    }

    if (todo.popup !== undefined) {
      getTodoByID.popup = !todo.popup;
    }

    todo.updatedAt = new Date();

    return true;
  };

  const remove = (todo: Pick<Todo, 'id'>): boolean => {
    const getIndexTodosByID: number = todos.findIndex((todoValue) => todoValue.id === todo.id);

    if (getIndexTodosByID === -1) return false;

    todos.splice(getIndexTodosByID, 1);

    return true;
  };

  const read = (): Todo[] => todos;

  return {
    add,
    update,
    remove,
    read,
  };
}
