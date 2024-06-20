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
            // remove task id
            const taskId = taskItem.id.replace('task-', '');
            removeTask(taskId);
        }
    });

    // Send a POST request to the '/add' route on the Flask server
    function addTask(task) {
        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'task=' + encodeURIComponent(task) // Example of a task encoded: 'task=Buy%20milk'
        })
        .then(response => response.json())
        .then(data => {
            const newTask = `<li id="task-${data.task.id}">${task} <button class="remove-btn">Remove</button></li>`;
            taskList.insertAdjacentHTML('beforeend', newTask);
            updateTaskCount();
        })
        .catch(error => {
            console.error('Error while adding new task:', error);
        });
    }

    // Send a POST request to the '/remove' route on the Flask server
    function removeTask(taskId) {
        fetch('/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'task_id=' + encodeURIComponent(taskId)
        })
        .then(response => response.json())
        .then(data => {
            const taskItem = document.getElementById(`task-${taskId}`);
            if (taskItem) {
                taskItem.remove();
                updateTaskCount();
            }
        })
        .catch(error => {
            console.error('Error while removing task:', error);
        });
    }
});
