document.addEventListener("DOMContentLoaded", function() {
    // Load tasks from local storage
    loadTasks();
});

function addTask() {
    var newTaskInput = document.getElementById("new-task");
    var taskText = newTaskInput.value.trim();

    if (taskText !== "") {
        // Create a new task element
        var taskElement = document.createElement("li");
        taskElement.textContent = taskText;

        // Append the task to the tasks list
        var tasksList = document.getElementById("tasks");
        tasksList.appendChild(taskElement);

        // Save tasks to local storage
        saveTasks();

        // Clear the input field
        newTaskInput.value = "";
    }
}

function taskClick(event) {
    var clickedElement = event.target;

    if (clickedElement.tagName === "LI") {
        // Toggle the "completed" class to strike through or unstrike the task
        clickedElement.classList.toggle("completed");

        // Save tasks to local storage
        saveTasks();
    }
}

function saveTasks() {
    // Get tasks from the tasks list
    var tasksList = document.getElementById("tasks");
    var tasks = Array.from(tasksList.children).map(task => task.textContent);

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    // Get tasks from local storage
    var storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        // Parse stored tasks as JSON
        var tasks = JSON.parse(storedTasks);

        // Create task elements and append to the tasks list
        var tasksList = document.getElementById("tasks");
        tasks.forEach(taskText => {
            var taskElement = document.createElement("li");
            taskElement.textContent = taskText;
            tasksList.appendChild(taskElement);
        });
    }
}

function deleteCompletedTasks() {
    var completedTasks = document.querySelectorAll(".completed");
    completedTasks.forEach(task => task.remove());

    // Save tasks to local storage
    saveTasks();
}
