const todoListElement = document.getElementById('todoList');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

document.getElementById('todoForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  todos.push({ id: Date.now(), name, description, status: 'open' });
  localStorage.setItem('todos', JSON.stringify(todos));

  document.getElementById('name').value = '';   //khali banauna
  document.getElementById('description').value = '';

  renderTodos();
});

function renderTodos(filter = 'all') {
  todoListElement.innerHTML = '';

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') // if conditin false bhaye tala ko natra mathi ko
      return true;  //3 ota le datatype check
    return todo.status === filter;
  });

  filteredTodos.forEach(todo => {
    const todoElement = document.createElement('div');
    todoElement.className = `todo-item ${todo.status === 'completed' ? 'completed' : ''}`;
    todoElement.innerHTML = `
      <div>
        <strong>${todo.name}</strong>
        <p>${todo.description}</p>
      </div>
      <div class="actions">
        <button onclick="toggleStatus(${todo.id})">
          ${todo.status === 'open' ? 'Mark as Complete' : 'Reopen'}
        </button>
        <button class="edit-button" onclick="editTodo(${todo.id})">Edit</button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    `;
    todoListElement.appendChild(todoElement);
  });
}

function toggleStatus(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      todo.status = todo.status === 'open' ? 'completed' : 'open';
    }
    return todo;
  });
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

function editTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  const newName = prompt('Edit Name', todo.name);
  const newDescription = prompt('Edit Description', todo.description);

  if (newName !== null && newDescription !== null) {
    todo.name = newName;
    todo.description = newDescription;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }
}

function deleteTodo(id) {
                 todos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

function filterTodos(status) {
  renderTodos(status);
}

renderTodos();
