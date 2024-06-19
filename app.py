from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_folder='static', static_url_path='/static')

tasks = []


# ------------------------- ROUTES --------------------------------

# Main route that renders the HTML template and passes the tasks list to it
@app.route('/')
def home():
    return render_template('index.html', tasks=tasks)

# ------------------------- ADD NEW TASK --------------------------

# This route receives a POST request with a task
# request is a Flask object that contains the data sent by the client
@app.route('/add', methods=['POST'])
def add_task():
    task = request.form.get('task')
    if task:
        tasks.append(task)
    # Return the updated tasks list
    return jsonify({'tasks': tasks})

# ------------------------- REMOVE NEW TASK -----------------------

# This route receives a POST request with a task
@app.route('/remove', methods=['POST'])
def remove_task():
    task = request.form.get('task')
    if task in tasks:
        tasks.remove(task)
    # Return the updated tasks list
    return jsonify({'tasks': tasks})

if __name__ == '__main__':
    app.run(debug=True)
