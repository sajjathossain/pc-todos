import { todos, renderTodosParams } from './data.js';

const refreshTodos = () => {
  renderTodos(renderTodosParams.incomplete);
  renderTodos(renderTodosParams.completed);
};

const toggleComplete = (id) => {
  const idx = todos.findIndex((item) => item.id === id);
  const item = todos[idx];

  const updatedTodo = { ...item, isComplete: item.isComplete ? false : true };

  todos.splice(idx, 1, updatedTodo);

  refreshTodos();
};

const deleteTodo = (id) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);

  refreshTodos();
};

const createElement = (todo) => {
  const li = document.createElement('li');
  li.classList.add('todo-item');

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');

  if (todo.isComplete) {
    checkbox.checked = true;
  }

  checkbox.addEventListener('click', () => toggleComplete(todo.id));
  li.appendChild(checkbox);

  const span = document.createElement('span');
  span.textContent = `${todo.todo} - ${todo.description}`;
  li.appendChild(span);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  if (!todo.isComplete) {
    deleteBtn.classList.add('hidden');
  }

  deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
  li.appendChild(deleteBtn);

  return li;
};

/**
 * render todos
 * @param {Object}
 * @param {string} id
 * @param {boolean} isComplete
 */
export const renderTodos = ({ id, isComplete }) => {
  const completed = todos.filter((item) => item.isComplete === isComplete);

  const ul = document.getElementById(id);
  ul.innerHTML = '';
  completed.forEach((todo) => {
    const li = createElement(todo);
    ul.appendChild(li);
  });
};
