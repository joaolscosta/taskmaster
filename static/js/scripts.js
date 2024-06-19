document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('new-task-input-section');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');

    // Get the total number of tasks and update the task count
    function updateTaskCount() {
        // get the number os tasks from the task list
        taskCount.textContent = taskList.children.length;
    }

    // Update the task count everytime when the page loads
    updateTaskCount();

    // Add button
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // get the task input value without any white spaces at the beginning and end
        const taskInput = document.getElementById('task-input').value.trim();

        if (taskInput !== '') {
            addTask(taskInput);
            // clear the input field after adding the task
            document.getElementById('task-input').value = '';
        }
    });

    // Remove button
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            // get the all task item with the remove button
            const taskItem = event.target.parentElement;
            // get the task text (firstChild) 
            const taskText = taskItem.firstChild.textContent.trim();
            removeTask(taskText);
        }
    });

    function addTask(task) {
        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'task=' + encodeURIComponent(task)
        })
        .then(response => response.json())
        .then(data => {
            const newTask = `<li id="task-${data.tasks.length}">${task} <button class="remove-btn">Remove</button></li>`;
            taskList.insertAdjacentHTML('beforeend', newTask);
            updateTaskCount();
        })
        .catch(error => {
            console.error('Error while adding new task:', error);
        });
    }

    function removeTask(task) {
        fetch('/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'task=' + encodeURIComponent(task)
        })
        .then(response => response.json())
        .then(data => {
            const taskItem = document.getElementById(`task-${data.tasks.length}`);
            taskItem.remove();
            updateTaskCount();
        })
        .catch(error => {
            console.error('Error while removing new task:', error);
        });
    }
});
