const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const count = document.querySelector('#count');
let tasks = JSON.parse(localStorage.getItem('mariana-tareas') || '[]');
function save() { localStorage.setItem('mariana-tareas', JSON.stringify(tasks)); render(); }
function render() {
  list.replaceChildren();
  tasks.forEach(task => {
    const item = document.createElement('li'); item.className = task.done ? 'done' : '';
    const label = document.createElement('label'); const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.checked = task.done;
    checkbox.addEventListener('change', () => { task.done = checkbox.checked; save(); });
    const text = document.createElement('span'); text.textContent = task.text; label.append(checkbox, text);
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'remove'; remove.textContent = 'Borrar'; remove.setAttribute('aria-label', `Borrar ${task.text}`);
    remove.addEventListener('click', () => { tasks = tasks.filter(entry => entry.id !== task.id); save(); });
    item.append(label, remove); list.append(item);
  });
  const pending = tasks.filter(task => !task.done).length;
  count.textContent = tasks.length ? `${pending} pendiente${pending === 1 ? '' : 's'} · ${tasks.length} en total` : 'Aún no tienes tareas.';
}
form.addEventListener('submit', event => { event.preventDefault(); const text = input.value.trim(); if (!text) return; tasks.push({id: crypto.randomUUID(), text, done: false}); input.value = ''; save(); input.focus(); });
render();
