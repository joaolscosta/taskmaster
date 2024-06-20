# TaskMaster

TaskMaster is a web application for managing your to-do list. It allows users to add, remove and list tasks.

## Files Included

- **app.py**: This file contains the Flask application setup, routes for handling task operations (adding and removing), and serves the HTML templates.
- **static/**
  - **style/**
    - **styles.css**: CSS file for styling the web application.
  - **images/**
    - **logo.png**: Logo image used in the application.
  - **js/**
    - **scripts.js**: JavaScript file that handles client-side interactions such as adding and removing tasks dynamically.
- **templates/**
  - **index.html**: HTML template file that renders the main interface of the TaskMaster application.

## Prerequisites

Before running the project, ensure you have Python and Flask installed:

- Python 3
- Flask

## Setup (Linux-Ubuntu)

1. **Clone the repository:**
```
git clone https://github.com/joaolscosta/taskmaster.git
cd taskmaster
```

2. **Create and activate a virtual environment (can be not necessary if it runs without it):**

```
sudo apt install python3.10-venv
python -m venv venv # Create a virtual environment
source venv/bin/activate # Activate the virtual environment
```

3. **Install dependencies:**

```
pip install flask # Install Flask and other dependencies
```

## Run the Project

1. **Start the Flask application:**

```
python app.py
```

This will start the Flask development server.

2. **Access the application:**
Open a web browser and go to `http://localhost:5000` to view and interact with TaskMaster.

## Usage

- **Adding a Task:**
- Type a task into the input field and click the "+" button or press Enter.
- **Removing a Task:**
- Click the "Remove" button next to the task you want to remove.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript (Vanilla JS)
- **Backend:** Python, Flask
- **External Libraries:** Google Fonts (Work Sans)
