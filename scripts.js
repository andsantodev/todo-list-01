'use strict';

let dataBase = [
  {'task': 'XXXXX', 'isCheked': ''},
  {'task': 'YYYYY', 'isCheked': 'true'},
]

const list = document.querySelector('.list')
const newTask = document.querySelector('#new-task')

const addTask = (event) => {
  let key = event.key
  let text = event.target.value
  if (key === 'Enter') {
    dataBase.push({'task': text, 'isCheked': ''})
    renderList()
    event.target.value = ''
  }
}

const removeTask = (id) => {
  dataBase.slice(id, 1)
  renderList()
}

const updateTask = (id) => {
  dataBase[id].isCheked = dataBase[id].isCheked === '' ? true : ''
  renderList()
}

const clickTask = (event) => {
  const element = event.target
  if (element.type === 'button') {
    const id = element.dataset.id
    removeTask(id)
  } else if (element.type === 'checkbox') {
    const id = element.dataset.id
    updateTask(id)
  }
}

newTask.addEventListener('keypress', addTask)
list.addEventListener('click', clickTask)

const createItems = (task, isCheked = '', id) => {
  const label = document.createElement('label')
    label.classList.add('item')

  const inputCheckbox = document.createElement('input')
    inputCheckbox.type = 'checkbox'
    inputCheckbox.checked = isCheked
    inputCheckbox.setAttribute('data-index', id)

  const div = document.createElement('div')
    div.textContent = `${task}`

  const inputButton = document.createElement('input')
    inputButton.type = 'button'
    inputButton.value = 'X'
    inputCheckbox.setAttribute('data-index', id)

  label.appendChild(inputCheckbox)
  label.appendChild(div)
  label.appendChild(inputButton)
  list.appendChild(label)
}

const clearList = () => {
  while (list.firstChild) {
    list.removeChild(list.lastChild)
  }
}

const renderList = () => {
  clearList()
  dataBase.forEach((item, id) => {
    createItems(item.task, item.isCheked, id)
  })
}

renderList()
