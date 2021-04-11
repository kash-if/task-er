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
  // Load Local Storage data on DOM reload
  document.addEventListener('DOMContentLoaded', loadDataFromLocalStorage);
  // Add task event
  form.addEventListener('submit', addTask);
  // Delete Task
  taskList.addEventListener('click', removeTask);
  // Clear Task
  clearBtn.addEventListener('click', clearTasks);
  // Filter Task
  filter.addEventListener('keyup', filterTask);
}

// Load data from LS function
function loadDataFromLocalStorage() {
  let lsCreatedTaskList;
  if (localStorage.getItem('tasks created') === null) {
    lsCreatedTaskList = [];
  }
  else {
    lsCreatedTaskList = JSON.parse(localStorage.getItem('tasks created'));
  }
  lsCreatedTaskList.forEach(
    function(task) {
      // Create li element 
      const li = document.createElement('li');
      // Add class name to li
      li.className = 'collection-item';
      
      //Create text node and append to li
      li.appendChild(document.createTextNode(task));
      
      //Create a new link element
      const link = document.createElement('a');
      // Add class name to a
      link.className = 'delete-item secondary-content';
      
      // Add icon html
      link.innerHTML = '<i class="fa fa-check"></i>'
      
      // Append link element into li element
      li.appendChild(link);
      
      // Append li element to ul element with class name collection
      taskList.appendChild(li);
    }
    )
  }

  // addTask function
  function addTask(e) {
  if(taskInput.value === '') {
    alert('Please insert description to add a task');
  }
  else {
    // Create li element 
    const li = document.createElement('li');
    // Add class name to li
    li.className = 'collection-item';

    // Taking datestamp from Date function
    const today = new Date().toLocaleDateString('en-IN', {day:'2-digit',month:'2-digit',year:'numeric'});
    
    //Create text node and append to li
    li.appendChild(document.createTextNode(today + ' - ' + taskInput.value));
    
    //Create a new link element
    const link = document.createElement('a');
    // Add class name to a
    link.className = 'delete-item secondary-content';
    
    // Add icon html
    link.innerHTML = '<i class="fa fa-check"></i>'
    
    // Append link element into li element
    li.appendChild(link);
    
    // Append li element to ul element with class name collection
    taskList.appendChild(li);
    
    // Store task in Local Storage
    storeTaskInLocalStorage(today + ' - ' + taskInput.value);
  
    //Clear task input space
  taskInput.value = '';
}
e.preventDefault();
}

// Store task in LS function
function storeTaskInLocalStorage(task) {
  let lsCreatedTaskList;
  if (localStorage.getItem('tasks created') === null) {
    lsCreatedTaskList = [];
  }
  else {
    lsCreatedTaskList = JSON.parse(localStorage.getItem('tasks created'));
  }
  // Storing new task in LS with key 'tasks created'
  lsCreatedTaskList.push(task);
  localStorage.setItem('tasks created', JSON.stringify(lsCreatedTaskList));
}

// remove task function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    
    if (confirm('Selected task will be moved to completed category')) {
      e.target.parentElement.parentElement.remove();
      // Remove task from Local Storage too
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  
  e.preventDefault();
}

// Remove task from LS function
function removeTaskFromLocalStorage(task) {
  let lsCreatedTaskList;
  let lsCompletedTaskList;
  if (localStorage.getItem('tasks created') !== null) {
    lsCreatedTaskList = JSON.parse(localStorage.getItem('tasks created'));
    lsCreatedTaskList.forEach(
      function(taskData, index) {
        // Matching LS 'task created' data with HTML text content of li
        if (task.textContent === taskData) {
          if (localStorage.getItem('tasks completed') === null) {
            lsCompletedTaskList = [];
          }
          else {
            lsCompletedTaskList = JSON.parse(localStorage.getItem('tasks completed'));
          }
          // Taking timestamp from Date function
          const now = new Date().toLocaleString('en-IN', {day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false});
          // Storing completed task with datestamp in LS with key 'tasks completed'
          lsCompletedTaskList.push(lsCreatedTaskList[index] + ' => Completed on ' + now);
          localStorage.setItem('tasks completed', JSON.stringify(lsCompletedTaskList));
          // Removing completed task from LS having key 'tasks created'
          lsCreatedTaskList.splice(index,1);
          localStorage.setItem('tasks created', JSON.stringify(lsCreatedTaskList));
        }
      }
      )
    }
  }
  
  // clear task function
  function clearTasks() {
    let lsCreatedTaskList;
    let lsDeletedTaskList;
    if (confirm('All tasks in window will be moved to deleted category')) {
      while (taskList.firstChild) {
        if (localStorage.getItem('tasks created') !== null) {
          lsCreatedTaskList = JSON.parse(localStorage.getItem('tasks created'));
          lsCreatedTaskList.forEach(
            function (task,index) {
              // To search index for LS items which matches HTML text content of li element
              if (task === taskList.firstChild.textContent) {
                if(localStorage.getItem('tasks deleted') === null) {
                  lsDeletedTaskList = [];
                }
                else {
                  lsDeletedTaskList = JSON.parse(localStorage.getItem('tasks deleted'));
                }
                // Taking timestamp from Date function
                const now = new Date().toLocaleString('en-IN', {day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false});
                // Storing removed tasks with datestamp in LS with key 'tasks deleted'
                lsDeletedTaskList.push(taskList.firstChild.textContent + ' => Deleted on ' + now);
              localStorage.setItem('tasks deleted', JSON.stringify(lsDeletedTaskList));
              // Removing tasks from LS with key 'tasks created'
              lsCreatedTaskList.splice(index,1);
              localStorage.setItem('tasks created', JSON.stringify(lsCreatedTaskList));
            }
          }
        )
      }
      taskList.removeChild(taskList.firstChild);
    }
  }
  filter.value = '';
  taskInput.value = '';
}


// clear LS data function
function clearLocalStorageData() {
  localStorage.clear();
}

// filter task function
function filterTask(e){
  const filterInput = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      const item = task.firstChild.textContent.toLowerCase();
      if ( item.indexOf(filterInput) != -1) {
        task.style.display = 'block';
      }
      else
      {
        task.style.display = 'none';
      }
    }
  )
}
