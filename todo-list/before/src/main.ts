const form = document.querySelector<HTMLFormElement>('#new-todo-form')!;

const list = document.querySelector<HTMLUListElement>('#list')

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const input = document.querySelector<HTMLInputElement>('#todo-input');

  if (input?.value) {
    const newTodo = createNewTodo(input.value);
    list?.appendChild(newTodo);
  }
});

function createNewTodo(value: string) {
  const template = document.querySelector('#template')! as HTMLTemplateElement;
  const cloneList = template.content.cloneNode(true) as HTMLLIElement;
  const labelText = cloneList.querySelector('.label-text')!;
  labelText.textContent = value;
  return cloneList;
}

list?.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  
  if (target.matches('.delete-btn')) {
    target.closest('.list-item')?.remove();
  }
});