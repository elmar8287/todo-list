/* eslint-disable */
export class DND {
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
/* eslint-anable */