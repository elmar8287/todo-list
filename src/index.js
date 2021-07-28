const addTasksBtn = document.getElementById('add-task-btn'); // call button for add tasks
const deskTaskInput = document.getElementById('description-task'); // the tasks input
const todoWrapper = document.querySelector('.todos-wrapper'); // the tasks section where they will be displayed

let tasks; // this is an empty array of our taks
!localStorage.tasks ? tasks = []: tasks = JSON.parse(localStorage.getItem('tasks')); // check the local storage of any tasks


// const tasks = {
//   description: 'Create todo-list',
//   completed: false,
//   index: 1
// }

function Task(description) { // this is a constructor for each task
  this.description = description; // this comes from input
  this.completed = false; // by default the task will be not completed
  this.index = tasks.length+1; // the index of inputed task
}

const createTemplate = (task, index) => { // this is a template wich we will send to HTML
  return `
    <div class="todo-item ${task.completed ? 'checked' : ''}">
    <input onclick="completeTask(${index})" class="btn-competed" type="checkbox" ${task.completed ? 'checked' : ''}>
      <div class="description">${task.description}</div>
      
    </div>
  `
};

const addToHTML = () => { // adding the list of tasks to HTML, to out DIV
  todoWrapper.innerHTML = ""; // empty the lit of tasks in HTML
  if(tasks.length > 0) { // if the array of taks is not empty
    tasks.forEach((item, index) => { // iterate out array each task and send it to HTML
      todoWrapper.innerHTML += createTemplate(item, index); // each item we will add to function create an template
    });
  }
};

addToHTML();

const updateLocal = () => { // add to Local storage
  localStorage.setItem('tasks', JSON.stringify(tasks)); // save as a string using JSON
};

const completeTask = index => { // function for change the comple status to complete
  tasks[index].completed = !tasks[index].completed; // add onclick the calling the function which will set the index of a task
};

addTasksBtn.addEventListener('click', () => { // by clicking the button
  tasks.push(new Task(deskTaskInput.value)); // add new task
  updateLocal(); // save to Local Storage
  addToHTML(); // call function wich add new task to HTML template
  deskTaskInput.value = ''; // clear the input after clicking "Add" button
});