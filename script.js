// DOM Elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from LocalStorage on startup, or default to an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks to the screen
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">×</button>
        `;
    taskList.appendChild(li);
  });

  // Save updated list to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    tasks.push(taskText);
    taskInput.value = ""; // Clear input field
    renderTasks();
  }
}

// Function to delete a task
window.deleteTask = function (index) {
  tasks.splice(index, 1);
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
