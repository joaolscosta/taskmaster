from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_folder='static', static_url_path='/static')

tasks = []
id = 0

# ------------------------- ROUTES --------------------------------

# Main route that renders the HTML template and passes the tasks list to it
@app.route('/')
def home():
    return render_template('index.html', tasks=tasks)

# ------------------------- ADD NEW TASK --------------------------

# This route receives a POST request with a task
@app.route('/add', methods=['POST'])
def add_task():
    global id
    task_text = request.form.get('task')
    if task_text:
        # generate a new unique task id
        task_id = id + 1
        id += 1
        task = {'id': task_id, 'text': task_text}
        tasks.append(task)
        return jsonify({'task': task, 'tasks': tasks}), 201
    else:
        return jsonify({'error': 'Task text is required'}), 400

# ------------------------- REMOVE NEW TASK -----------------------

# This route receives a POST request with a task_id to remove
@app.route('/remove', methods=['POST'])
def remove_task():
    task_id = request.form.get('task_id')
    if task_id:
        try:
            task_id = int(task_id)
            task_to_remove = None
            for task in tasks:
                if task['id'] == task_id:
                    task_to_remove = task
                    break
            if task_to_remove:
                tasks.remove(task_to_remove)
                return jsonify({'tasks': tasks})
        except ValueError:
            return jsonify({'error': 'Invalid task_id format'}), 400
    return jsonify({'error': 'task_id is required'}), 400

if __name__ == '__main__':
    app.run(debug=True)
