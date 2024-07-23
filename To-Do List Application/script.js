document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-button');

    let tasks = [];

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);
    filterButtons.forEach(button => button.addEventListener('click', filterTasks));

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    }

    function handleTaskClick(e) {
        if (e.target.classList.contains('delete-task')) {
            const index = e.target.parentElement.getAttribute('data-index');
            tasks.splice(index, 1);
            renderTasks();
        } else if (e.target.classList.contains('toggle-task')) {
            const index = e.target.parentElement.getAttribute('data-index');
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        }
    }

    function filterTasks(e) {
        const filter = e.target.getAttribute('data-filter');
        renderTasks(filter);
    }

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        tasks
            .filter(task => {
                if (filter === 'all') return true;
                if (filter === 'active') return !task.completed;
                if (filter === 'completed') return task.completed;
            })
            .forEach((task, index) => {
                const taskElement = document.createElement('li');
                taskElement.classList.add('task');
                if (task.completed) {
                    taskElement.classList.add('completed');
                }
                taskElement.setAttribute('data-index', index);
                taskElement.innerHTML = `
                    <span class="toggle-task">${task.text}</span>
                    <button class="delete-task">Delete</button>
                `;
                taskList.appendChild(taskElement);
            });
    }
});
