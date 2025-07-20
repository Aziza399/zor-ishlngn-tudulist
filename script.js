const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const themeBtn = document.getElementById('themeBtn');

let todos = [];

// Theme toggling
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeBtn.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// Add todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        const todo = {
            id: Date.now(),
            text,
            completed: false
        };
        todos.push(todo);
        renderTodos();
        todoInput.value = '';
    }
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

// Filter todos based on search
function filterTodos(searchText) {
    const filteredTodos = todos.filter(todo =>
        todo.text.toLowerCase().includes(searchText.toLowerCase())
    );
    renderTodoList(filteredTodos);
}

// Render specific todos
function renderTodoList(todosToRender) {
    todoList.innerHTML = '';
    todosToRender.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(todo.id));

        const text = document.createElement('span');
        text.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Render all todos
function renderTodos() {
    renderTodoList(todos);
}

// Event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

todoInput.addEventListener('input', (e) => {
    filterTodos(e.target.value);
});

// Initial render
renderTodos();