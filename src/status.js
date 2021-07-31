export function updateStatus(event, status) {
  event.target.nextElementSibling.classList.toggle('completed');
  status[event.target.dataset.id].completed = event.target.checked;
  return status;
}
export function editTodo(event, editable) {
  editable[event.target.dataset.index].description = event.target.value;
  return editable;
}