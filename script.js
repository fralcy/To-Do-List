function addTask() {
  // Get the input element where the task is entered
  var taskInput = document.getElementById("task");

  // Get the value of the task input
  var taskText = taskInput.value;

  // If the task is not empty
  if (taskText.trim() !== "") {
    // Create a new list item
    var li = document.createElement("li");
    li.className = "flex items-center justify-between gap-x-1 md:gap-x-2 border border-gray-300 dark:border-slate-800 px-2 py-1 md:px-4 md:py-2 rounded";
    
    // Create a checkbox element
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-checkbox w-3 h-3 md:w-4 md:h-4 text-blue-500 rounded border-gray-400 dark:border-gray-600 dark:bg-slate-700 dark:checked:bg-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600";

    // Create a span element for the task text
    var p = document.createElement("p");
    p.textContent = taskText;
    p.className = "text-gray-800 dark:text-gray-200 text-pretty flex-grow";
    
    // Add event listener to checkbox to toggle the completed style
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        p.classList.add('task-completed');
      } else {
        p.classList.remove('task-completed');
      }
    });
    
    // Create container for action buttons
    var buttonsContainer = document.createElement("div");
    buttonsContainer.className = "flex items-center gap-1";
    
    // Create move up button
    var upButton = document.createElement("button");
    upButton.innerHTML = "&#8593;"; // Up arrow
    upButton.className = "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white dark:text-gray-200 px-2 py-1 text-sm rounded";
    upButton.onclick = function() {
      moveTaskUp(this.parentNode.parentNode);
    };
    
    // Create move down button
    var downButton = document.createElement("button");
    downButton.innerHTML = "&#8595;"; // Down arrow
    downButton.className = "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white dark:text-gray-200 px-2 py-1 text-sm rounded";
    downButton.onclick = function() {
      moveTaskDown(this.parentNode.parentNode);
    };
    
    // Create edit button
    var editButton = document.createElement("button");
    editButton.innerHTML = "&#9998;"; // Pencil icon
    editButton.className = "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white dark:text-gray-200 px-2 py-1 text-sm rounded";
    editButton.onclick = function() {
      editTask(this.parentNode.parentNode);
    };
    
    // Create a delete button with trash icon
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#128465;"; // Trash can icon
    deleteButton.onclick = function() {
      // Remove the parent list item when the delete button is clicked
      this.parentNode.parentNode.remove();
      saveTasks();
    };
    deleteButton.className = "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white dark:text-gray-200 px-2 py-1 text-sm rounded";

    // Append buttons to container
    buttonsContainer.appendChild(upButton);
    buttonsContainer.appendChild(downButton);
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);
    
    // Append the checkbox, span, and buttons container to the list item
    li.appendChild(checkbox);
    li.appendChild(p);
    li.appendChild(buttonsContainer);

    // Append the list item to the task list
    document.getElementById("taskList").appendChild(li);

    // Clear the input field after adding the task
    taskInput.value = "";
    
    // Save tasks after adding
    saveTasks();
  } else {
    // Alert the user if the task input is empty
    alert("Please enter a task!");
  }
}

// Function to move a task up
function moveTaskUp(listItem) {
  var prev = listItem.previousElementSibling;
  if (prev) {
    listItem.parentNode.insertBefore(listItem, prev);
    saveTasks();
  }
}

// Function to move a task down
function moveTaskDown(listItem) {
  var next = listItem.nextElementSibling;
  if (next) {
    listItem.parentNode.insertBefore(next, listItem);
    saveTasks();
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
    var tasksContainer = document.querySelector("ul");

    // Clear the existing tasks (if any)
    tasksContainer.innerHTML = "";

    // Iterate over the tasks array
    tasksArray.forEach(function (task) {
      // Create a list item element
      var li = document.createElement("li");
      li.className = "flex items-center justify-between gap-x-1 md:gap-x-2 border border-gray-300 dark:border-slate-800 px-2 py-1 md:px-4 md:py-2 rounded";

      // Create a checkbox element
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-checkbox rounded border-gray-400 dark:border-gray-600 dark:bg-slate-700 dark:checked:bg-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600";
      checkbox.checked = task.state === "checked"; // Set checkbox state based on saved state

      // Create a span element for the task text
      var p = document.createElement("p");
      p.textContent = task.name;
      p.className = "text-gray-800 dark:text-gray-200 text-pretty flex-grow";
      // If the task is checked, add the completed style
      if (task.state === "checked") {
        p.classList.add('task-completed');
      }
      
      // Add event listener to checkbox to toggle the completed style
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          p.classList.add('task-completed');
        } else {
          p.classList.remove('task-completed');
        }
        saveTasks();
      });

      // Create container for action buttons
      var buttonsContainer = document.createElement("div");
      buttonsContainer.className = "flex items-center gap-1";
      
      // Create move up button
      var upButton = document.createElement("button");
      upButton.innerHTML = "&#8593;"; // Up arrow
      upButton.className = "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white dark:text-gray-200 px-2 py-1 text-sm rounded";
      upButton.onclick = function() {
        moveTaskUp(this.parentNode.parentNode);
      };
      
      // Create move down button
      var downButton = document.createElement("button");
      downButton.innerHTML = "&#8595;"; // Down arrow
      downButton.className = "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white dark:text-gray-200 px-2 py-1 text-sm rounded";
      downButton.onclick = function() {
        moveTaskDown(this.parentNode.parentNode);
      };
      
      // Create edit button
      var editButton = document.createElement("button");
      editButton.innerHTML = "&#9998;"; // Pencil icon
      editButton.className = "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white dark:text-gray-200 px-2 py-1 text-sm rounded";
      editButton.onclick = function() {
        editTask(this.parentNode.parentNode);
      };
      
      // Create a delete button with trash icon
      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "&#128465;"; // Trash can icon
      deleteButton.onclick = function() {
        // Remove the parent list item when the delete button is clicked
        this.parentNode.parentNode.remove();
        saveTasks();
      };
      deleteButton.className = "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white dark:text-gray-200 px-2 py-1 text-sm rounded";

      // Append buttons to container
      buttonsContainer.appendChild(upButton);
      buttonsContainer.appendChild(downButton);
      buttonsContainer.appendChild(editButton);
      buttonsContainer.appendChild(deleteButton);
      
      // Append the checkbox, span, and buttons container to the list item
      li.appendChild(checkbox);
      li.appendChild(p);
      li.appendChild(buttonsContainer);

      // Append the list item to the tasks container
      tasksContainer.appendChild(li);
    });
  }
}

// Function to edit a task
function editTask(listItem) {
  var taskText = listItem.querySelector("p").textContent;
  var newText = prompt("Edit task:", taskText);
  
  // Update task if user entered something and didn't cancel
  if (newText !== null && newText.trim() !== "") {
    listItem.querySelector("p").textContent = newText.trim();
    saveTasks();
  }
}

function clearTasks() {
  // Clear the tasks from the task list
  var listItems = document.querySelectorAll("li");
  listItems.forEach(function (item) {
    item.remove();
  });
  
  // Clear local storage
  localStorage.removeItem("listItemsData");
}

function autoLoadTasks() {
  // Load tasks when the page loads
  loadTasks();
}