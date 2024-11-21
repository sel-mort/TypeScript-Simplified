type Todo = {
  id: string,
  name: string,
  completed: boolean
}

const form = document.querySelector<HTMLFormElement>('#new-todo-form')!;

const list = document.querySelector<HTMLUListElement>('#list')!;

const todoList = loadTodos() as Todo[];

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const input = document.querySelector<HTMLInputElement>('#todo-input');
  if (!input?.value) return;

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    name: input.value,
    completed: false
  };
  
  setTodo(todoList, newTodo);
  const newTodoNode = createNewTodoNode(newTodo);
  list?.appendChild(newTodoNode);
  input.value = "";
});

function createNewTodoNode({ id, name, completed }: Todo) {
  const template = document.querySelector('#template')! as HTMLTemplateElement;
  const cloneList = template.content.cloneNode(true) as HTMLLIElement;
  const labelText = cloneList.querySelector('.label-text')!;
  const labelInput = cloneList.querySelector<HTMLInputElement>('.label-input')!;
  const li = cloneList.children[0];
  li.id = id;
  labelText.textContent = name;
  labelInput.checked = completed;

  return cloneList;
}

list?.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  
  if (target.matches('.delete-btn')) {
    target.closest('.list-item')?.remove();
    const todo = target.closest('.list-item')?.id;
    deleteTodo(todoList, todo ?? '');
  }
});

function loadTodos() {
  const todoList = localStorage.getItem("todoList");
  const todos = todoList ? JSON.parse(todoList) : [];

  todos.forEach((todo: Todo) => {
    list.appendChild(createNewTodoNode(todo));
  });
  
  return todos;
}

function setTodo(todoList: Todo[], todo: Todo) {
  todoList.push(todo);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  return todoList;
}

function deleteTodo(todoList: Todo[], id: string) {
  todoList = todoList.filter((todo: Todo) => {
    return todo.id !== id;
  });
  localStorage.setItem("todoList", JSON.stringify(todoList));
}