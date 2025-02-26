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
    li.className = "flex items-center justify-between gap-x-1 md:gap-x-2 border border-gray-300 dark:border-slate-800 px-2 py-1 md:px-4 md:py-2 rounded";
    
    // Add a drag handle icon
    var dragHandle = document.createElement("div");
    dragHandle.innerHTML = "≡";
    dragHandle.className = "text-gray-500 dark:text-gray-400 mr-2 handle"; // Changed to 'handle' class for consistency
    
    // Create a checkbox element
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className ="form-checkbox w-3 h-3 md:w-4 md:h-4 text-blue-500 rounded border-gray-400 dark:border-gray-600 dark:bg-slate-700 dark:checked:bg-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600";

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
    
    // Create a delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
      // Remove the parent list item when the delete button is clicked
      this.parentNode.remove();
    };
    deleteButton.className = "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white dark:text-gray-200 px-2 py-1 md:px-3 md:py-2 text-sm md:text-base rounded";

    // Append the drag handle, checkbox, span, and delete button to the list item
    li.appendChild(dragHandle);
    li.appendChild(checkbox);
    li.appendChild(p);
    li.appendChild(deleteButton);

    // Append the list item to the task list
    document.getElementById("taskList").appendChild(li);

    // Clear the input field after adding the task
    taskInput.value = "";
    
    // Re-initialize Sortable after adding a new task
    initSortable();
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
      li.className = "flex items-center justify-between gap-x-1 md:gap-x-2 border border-gray-300 dark:border-slate-800 px-2 py-1 md:px-4 md:py-2 rounded";

      // Add a drag handle icon
      var dragHandle = document.createElement("div");
      dragHandle.innerHTML = "≡";
      dragHandle.className = "text-gray-500 dark:text-gray-400 mr-2 handle"; // Changed to 'handle' class for consistency

      // Create a checkbox element
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-checkbox w-3 h-3 md:w-4 md:h-4 text-blue-500 rounded border-gray-400 dark:border-gray-600 dark:bg-slate-700 dark:checked:bg-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600";
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
      });

      // Create a delete button
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function() {
        // Remove the parent list item when the delete button is clicked
        this.parentNode.remove();
      };
      deleteButton.className = "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white dark:text-gray-200 px-2 py-1 md:px-3 md:py-2 text-sm md:text-base rounded";

      // Append the drag handle, checkbox, span, and delete button to the list item
      li.appendChild(dragHandle);
      li.appendChild(checkbox);
      li.appendChild(p);
      li.appendChild(deleteButton);

      // Append the list item to the tasks container
      tasksContainer.appendChild(li);
    });
    
    // Initialize Sortable after loading tasks
    initSortable();
  }
}

function clearTasks() {
  // Clear the tasks from the task list
  var listItems = document.querySelectorAll("li");
  listItems.forEach(function (item) {
    item.remove();
  });
}

function autoLoadTasks() {
  // Load tasks when the page loads
  loadTasks();
  
  // Initialize Sortable
  initSortable();
}

function initSortable() {
  // Get the task list element
  var taskList = document.getElementById('taskList');
  
  // Destroy any existing sortable instance first
  var oldSortable = taskList.sortable;
  if (oldSortable) {
    oldSortable.destroy();
  }
  
  // Initialize Sortable on the task list with enhanced mobile support
  taskList.sortable = new Sortable(taskList, {
    animation: 150,
    handle: '.handle', // Changed from .cursor-move to .handle
    touchStartThreshold: 5, // Lower threshold for mobile touches
    delay: 150, // Add delay for mobile devices
    delayOnTouchOnly: true, // Only delay for touch devices
    ghostClass: 'bg-blue-100', // Visual feedback during drag
    onEnd: function(evt) {      
      // Automatically save the new order when tasks are rearranged
      saveTasks();
    }
  });
}