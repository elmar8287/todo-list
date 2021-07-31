const addTasksBtn = document.getElementById('add-task-btn'); // call button for add tasks
const deskTaskInput = document.getElementById('description-task'); // the tasks input
const todoWrapper = document.querySelector('.todos-wrapper'); // the tasks section where they will be displayed

let tasks; // this is an empty array of our taks
/* eslint-disable */
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks')); // check the local storage of any tasks
/* eslint-anable */

let todoItemElems = [];

function Task(description) { // this is a constructor for each task
  this.description = description; // this comes from input
  this.completed = false; // by default the task will be not completed
  this.index = tasks.length + 1; // the index of inputed task
}
/* eslint-disable */
const createTemplate = (task, index) => { // this is a template wich we will send to HTML
  return `
    <li class="todo-item ${task.completed ? 'checked' : ''} draggable" draggable='true'>
      
      <input onclick="completeTask(${index})" class="btn-competed checkbox" type="checkbox" ${task.completed ? 'checked' : ''}>
      <div class="elmar">
        <div class="description">${task.description}</div>
        <div class="buttons">
          <button onclick="editTask(${index})" type="button" class="btn-delete">Edit</button>
          <button onclick="deleteTask(${index})" type="button" class="btn-delete">Delete</button>
          </div>
      </div>   
    </li>
  `;

};
/* eslint-anable */
const addToHTML = () => { // adding the list of tasks to HTML, to out DIV
  todoWrapper.innerHTML = ''; // empty the lit of tasks in HTML
  if (tasks.length > 0) { // if the array of taks is not empty
    tasks.forEach((item, index) => { // iterate out array each task and send it to HTML
      todoWrapper.innerHTML += createTemplate(item, index);
    });
    todoItemElems = document.querySelectorAll('.todo-item');
  }
};

addToHTML();

const updateLocal = () => { // add to Local storage
  localStorage.setItem('tasks', JSON.stringify(tasks)); // save as a string using JSON
};
/* eslint-disable */
const completeTask = (index) => { // function for change the comple status to complete
  tasks[index].completed = !tasks[index].completed; //change the status
  if (tasks[index].completed) {
    todoItemElems[index].classList.add('checked');
  } else {
    todoItemElems[index].classList.remove('checked');
  }
  updateLocal();
  addToHTML();
};
/* eslint-anable */
addTasksBtn.addEventListener('click', () => { // by clicking the button
  tasks.push(new Task(deskTaskInput.value)); // add new task
  updateLocal(); // save to Local Storage
  addToHTML(); // call function wich add new task to HTML template
  deskTaskInput.value = ''; // clear the input after clicking "Add" button

});

const deleteTask = index => { // function for delete button
  todoItemElems[index].classList.add('deletion');
  setTimeout(() => { // create a pause for animation when delete
    tasks.splice(index, 1); // splice delete the index
    updateLocal();
    addToHTML();
  }, 500);
};
class DND {
  constructor() {
    this.prevRow;
  }

  setEventListeners() {
    let listItems = document.querySelectorAll('li');
  
    listItems.forEach((listItem) => {
  
      listItem.addEventListener('dragstart', (e) => this.start(e));
      listItem.addEventListener('dragover', (e) => this.over(e));
      listItem.addEventListener('drop', (e) => this.drop(e));  
    });
  }

  start(e) {
    this.prevRow = e.target;

    let HTMLContent = e.target.innerHTML;
    let checkboxStatus = e.target.querySelector('input').checked;

    e.dataTransfer.setData('html-content', HTMLContent);
    e.dataTransfer.setData('checkbox-status', checkboxStatus);
  }

  over(e) {
    let currRow;

    if (e.target.parentNode.tagName === 'LI') currRow = e.target.parentNode;
    else if (e.target.parentNode.tagName === 'DIV') currRow = e.target.parentNode.parentNode;
    else currRow = e.target;

    e.preventDefault();

    if (this.prevRow !== currRow) {
      this.prevRow.innerHTML = currRow.innerHTML;
      this.prevRow.querySelector('input').checked = currRow.querySelector('input').checked;
      currRow.innerHTML = '';
      this.prevRow = currRow;
    }
  }

  drop(e) {
    const HTMLContent = e.dataTransfer.getData('html-content');
    const checkboxStatus = e.dataTransfer.getData('checkbox-status');

    e.target.innerHTML = HTMLContent;
    e.target.querySelector('input').checked = (checkboxStatus === 'true');
  }

}

function init() {
  let dnd = new DND(); 
  dnd.setEventListeners();  
}

let windowLoad = new Promise(function(resolve) {
  window.addEventListener('load', resolve);
});

windowLoad.then(
  function(result) {
    init();
  }
);

function updateStatus(event, status) {
  event.target.nextElementSibling.classList.toggle('completed');
  status[event.target.dataset.id].completed = event.target.checked;
  return status;
}
function editTodo(event, editable) {
  editable[event.target.dataset.index].description = event.target.value;
  return editable;
}

const checkboxes = document.querySelectorAll('.checkbox');
checkboxes.forEach((chbox) => {
  chbox.addEventListener('change', (event) => {
    const updatedTodo = updateStatus(event, updateLocal());
    saveToStorage('TodoList', updatedTodo);
  });
});

const editTask = index => {
  todoItemElems[index].contentEditable = true;
};
