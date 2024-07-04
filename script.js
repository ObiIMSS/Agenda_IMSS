document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const input = document.getElementById('task-input');
    const dateInput = document.getElementById('task-date');
    const prioritySelect = document.getElementById('task-priority'); // Selector de prioridad
    const taskList = document.getElementById('task-list');
    const filters = document.querySelectorAll('.filter-btn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        }).forEach((task, index) => {
            const taskElement = document.createElement('li');
            taskElement.className = 'task-item';
            taskElement.innerHTML = `
                <input type="text" class="task-text ${task.completed ? 'completed' : ''}" value="${task.text}" readonly>
                <span class="task-date">${task.dueDate || ''}</span>
                <span class="task-priority">Prioridad: ${task.priority}</span> <!-- Mostrar prioridad -->
                <button class="edit-button">Editar</button>
                <button class="complete-button">Completar</button>
                <button class="delete-button">Eliminar</button>
            `;
            taskList.appendChild(taskElement);

            // Event listeners para botones de editar, completar y eliminar aquí
            // (El código para estos botones permanece igual que en la versión anterior)
        });
    };

    addButton.addEventListener('click', () => {
        if (input.value.trim() !== '' && dateInput.value) {
            tasks.push({
                text: input.value,
                completed: false,
                dueDate: dateInput.value,
                priority: prioritySelect.value // Guardar la prioridad seleccionada
            });
            saveTasks();
            renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
            input.value = '';
            dateInput.value = '';
            prioritySelect.value = '1'; // Restablecer la selección de prioridad a 1
        }
    });

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            filter.classList.add('active');
            renderTasks(filter.dataset.filter);
        });
    });

    renderTasks();
});