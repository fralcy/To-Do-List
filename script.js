function addTask()
{
    // Get the input element where the task is entered
  var taskInput = document.getElementById("task");

  // Get the value of the task input
  var taskText = taskInput.value;

  // If the task is not empty
  if (taskText.trim() !== "") {
    // Create a new list item
    var li = document.createElement("li");
    li.className = "flex items-center justify-between gap-x-2 border border-gray-300 dark:border-slate-800 px-4 py-2 rounded";
    // Create a checkbox element
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className ="form-checkbox w-5 h-5 dark:bg-slate-800";

    // Create a span element for the task text
    var p = document.createElement("p");
    p.textContent = taskText;
    p.className = "text-gray-800 dark:text-gray-200 text-pretty";
    // Create a delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      // Remove the parent list item when the delete button is clicked
      this.parentNode.remove();
    };
    deleteButton.className = "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white dark:text-gray-200 px-3 py-2 rounded";

    // Append the checkbox, span, and delete button to the list item
    li.appendChild(checkbox);
    li.appendChild(p);
    li.appendChild(deleteButton);

    // Append the list item to the task list
    document.getElementById("taskList").appendChild(li);

    // Clear the input field after adding the task
    taskInput.value = "";
  } else {
    // Alert the user if the task input is empty
    alert("Please enter a task!");
  }
}
//Enter task with Enter key
function enterTask(event) {
  // Check if the Enter key is pressed (keyCode 13)
  if (event.keyCode === 13) {
    // Prevent the default behavior of the Enter key (form submission)
    event.preventDefault();
    // Call the addTask function when Enter key is pressed
    addTask();
  }
}
function saveTasks() {
  console.log("Saving tasks...");
  // Get all list items
  var listItems = document.querySelectorAll("li");

  // Initialize an array to hold the items' data
  var itemsData = [];

  // Iterate over each list item
  listItems.forEach(function (item) {
    // Extract state and name information
    var state = item.querySelector("input[type='checkbox']").checked ? "checked" : "unchecked";
    var name = item.querySelector("p").textContent;

    // Push state and name to the itemsData array
    itemsData.push({ state: state, name: name });
  });
  console.log(itemsData);
  // Convert the itemsData array to a string and store it in local storage
  localStorage.setItem("listItemsData", JSON.stringify(itemsData));
}
function loadTasks() {
  // Get the saved tasks data from local storage
  var savedTasks = localStorage.getItem("listItemsData");

  // Check if there are saved tasks
  if (savedTasks) {
    // Parse the JSON string to convert it back to an array
    var tasksArray = JSON.parse(savedTasks);

    // Get the element where you want to display the tasks
    var tasksContainer = document.querySelector("ul"); // Replace "tasks-container" with the ID of your tasks container

    // Clear the existing tasks (if any)
    tasksContainer.innerHTML = "";

    // Iterate over the tasks array
    tasksArray.forEach(function (task) {
      // Create a list item element
      var li = document.createElement("li");
      li.className = "flex items-center justify-between gap-x-2 border border-gray-300 dark:border-slate-800 px-4 py-2 rounded";

      // Create a checkbox element
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-checkbox w-5 h-5 dark:bg-slate-800";
      checkbox.checked = task.state === "checked"; // Set checkbox state based on saved state

      // Create a span element for the task text
      var p = document.createElement("p");
      p.textContent = task.name;
      p.className = "text-gray-800 dark:text-gray-200 text-pretty";

      // Create a delete button
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function () {
        // Remove the parent list item when the delete button is clicked
        this.parentNode.remove();
      };
      deleteButton.className = "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white dark:text-gray-200 px-3 py-2 rounded";

      // Append the checkbox, span, and delete button to the list item
      li.appendChild(checkbox);
      li.appendChild(p);
      li.appendChild(deleteButton);

      // Append the list item to the tasks container
      tasksContainer.appendChild(li);
    });
  }
}