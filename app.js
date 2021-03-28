// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All Event listeners
loadEventListeners();

// Load All Event listeners function
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
}

// addTask function
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a Task');
  }
  else {
  // Create li element 
  const li = document.createElement('li');
  // Add class name to li
  li.className = 'collection-item';

  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //Create a new link element
  const link = document.createElement('a');
  // Add class name to a
  link.className = 'delete-item secondary-content';

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'

  // Append link element into li element
  li.appendChild(link);

  //Clear task input space
  taskInput.value = '';

  // Append li element to ul element with class name collection
  taskList.appendChild(li);

  //console.log(ul);
  }
  e.preventDefault();
}
