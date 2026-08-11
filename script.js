// DOM Elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from LocalStorage on startup, or default to an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks to the screen
function renderTasks() {
    taskList.innerHTML = '';

   tasks.forEach((task, index) => {
    const li = document.createElement('li');
    
    // Safety check: handle old string data or new object data
    const isCompleted = task.completed || false;
    const taskText = typeof task === 'object' ? task.text : task;
    
    if (isCompleted) {
        li.classList.add('completed');
    }
    
    li.innerHTML = `
        <span onclick="toggleTask(${index})" style="cursor:pointer; flex:1;">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(${index})">×</button>
    `;
    taskList.appendChild(li);
});

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        // Save tasks as objects instead of plain text strings
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

window.deleteTask = function(index) {
    tasks.splice(index, 1);
    renderTasks();
};

// New function to toggle complete status
window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
};

// Event Listeners
addBtn.addEventListener("click", addTask);

// Allow pressing "Enter" key to add a task
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Initial render when the page loads
renderTasks();
