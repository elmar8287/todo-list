const addTasksBtn = document.getElementById('add-task-btn'); // call button for add tasks
const deskTaskInput = document.getElementById('description-task'); // the tasks input
const todoWrapper = document.querySelector('.todos-wrapper'); // the tasks section where they will be displayed

let tasks; // this is an empty array of our taks
/* eslint-disable */
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks')); // check the local storage of any tasks
/* eslint-anable */
// const tasks = {
//   description: 'Create todo-list',
//   completed: false,
//   index: 1
// }

let todoItemElems = [];

function Task(description) { // this is a constructor for each task
  this.description = description; // this comes from input
  this.completed = false; // by default the task will be not completed
  this.index = tasks.length + 1; // the index of inputed task
}
/* eslint-disable */
const createTemplate = (task, index) => { // this is a template wich we will send to HTML
  return `
    <div class="todo-item ${task.completed ? 'checked' : ''} draggable" draggable='true'>
    <input onclick="completeTask(${index})" class="btn-competed" type="checkbox" ${task.completed ? 'checked' : ''}>
      <div class="elmar">
        <div class="description">${task.description}</div>
        <div class="buttons">
          <button onclick="deleteTask(${index})" type="button" class="btn-delete">Delete</button>
          </div>
      </div>
    </div>
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

// const editTask = index => {
//   let span = tasks[index].description;
//   // todoItemElems[index].classList.add('edition');
//   let aaa = document.createElement('input');
//   aaa.type = 'text';  
//   span = aaa.value;
// };

const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.todos-wrapper')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return {
        offset: offset,
        element: child
      }
    } else {
      return closest
    }
  }, {
    offset: Number.NEGATIVE_INFINITY
  }).element
}