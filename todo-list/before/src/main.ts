import './style.css'

console.log('main')

const form = document.querySelector<HTMLFormElement>('#new-todo-form')!;

const list = document.querySelector<HTMLUListElement>('#list')

const input = document.querySelector<HTMLInputElement>('#todo-input')!;

const deleteBtn = document.querySelector<HTMLButtonElement>('delete-btn')!;

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  console.log('Form submitted!!');
  const value = input?.value;
  if (value) {
    console.log(value);
    const newTodo = createNewTodo(value);
    newTodo
    list?.appendChild(newTodo);
  }
});

function createNewTodo(value: string) {
  const list = document.querySelector<HTMLLIElement>('.list-item')!;
  const cloneList = list.cloneNode(true) as HTMLLIElement;
  const labelText = cloneList.querySelector('.label-text')!;
  labelText.textContent = value;
  return cloneList
  // const cloneList = document.createElement('li');
  // list.classList.add('list-item');
}

console.log(form, input);