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
  // Delete Task
  taskList.addEventListener('click', removeTask);
  // Clear Task
  clearBtn.addEventListener('click', clearTasks);
  // Filter Task
  filter.addEventListener('keyup', filterTask);
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

// remove task function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {

    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }

  e.preventDefault();
}

// clear task function
function clearTasks() {
  //taskList.innerHTML = '';
  
  //Faster
  if (confirm('Are you sure?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
}

// filter task function
function filterTask(e){
  const filterInput = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      const item = task.firstChild.textContent.toLowerCase();
      console.log(item);
      if ( item.indexOf(filterInput) != -1) {
      //if ( item === filterInput) {
        task.style.display = 'block';
      }
      else
      {
        task.style.display = 'none';
      }
      //console.log(item);
    }
  )

  console.log(filterInput);

}
