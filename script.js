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
    li.className = "flex items-center justify-between gap-x-2 border border-gray-300 px-4 py-2 rounded";
    // Create a checkbox element
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Create a span element for the task text
    var p = document.createElement("p");
    p.textContent = taskText;
    p.className = "text-gray-800 text-pretty";
    // Create a delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      // Remove the parent list item when the delete button is clicked
      this.parentNode.remove();
    };
    deleteButton.className = "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-3 py-2 rounded";

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
function enterTask(event) {
  // Check if the Enter key is pressed (keyCode 13)
  if (event.keyCode === 13) {
    // Prevent the default behavior of the Enter key (form submission)
    event.preventDefault();
    // Call the addTask function when Enter key is pressed
    addTask();
  }
}