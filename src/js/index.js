import * as renderMethods from './render-todos.js';
import { renderTodosParams, todos } from './data.js';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const btnShow = document.querySelector('.btn-show');

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);

    const todo = form.get('todo');
    const description = form.get('description');
    const isComplete = form.get('completed') === 'on';

    todos.push({ todo, description, isComplete, id: todos.length + 1 });

    const params = isComplete
      ? renderTodosParams.completed
      : renderTodosParams.incomplete;

    return renderMethods.renderTodos(params);
  };

  form.addEventListener('submit', handleSubmit);
  btnShow.addEventListener('click', () => {
    const isHidden = form.classList.contains('hidden');

    btnShow.textContent = isHidden ? 'Show form' : 'Hide form';
    btnShow.setAttribute('aria-label', isHidden ? 'Hide form' : 'Show form');

    form.classList.toggle('hidden');
  });
});
