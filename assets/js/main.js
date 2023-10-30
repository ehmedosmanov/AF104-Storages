const addTodo = document.querySelector('.add')
const validationText = document.getElementById('validation')
const todoInput = document.getElementById('todoInput')
const todoItems = document.querySelector('.todo-items')
const deleteAll = document.querySelector('#delete-all')
const todoArrLocal = getLocalStorage('data')

todoInput.focus()
let data = []

if (todoArrLocal) {
  data = todoArrLocal
  data.forEach((element, index) => {
    createTodo(element, index)
  })
}

function createTodoElement(type, content, classnames) {
  const element = document.createElement(type)
  element.textContent = content
  element.classList.add(classnames)
  return element
}

function createTodo(text, index) {
  const todoItemCreate = createTodoElement('li', '', 'todo-item')
  const todoTextCreate = createTodoElement('p', text, 'text')
  const todoIconBoxCreate = createTodoElement('div', '', 'icons')
  const todoCheckCreate = createTodoElement('input', '', 'icons')
  const todoEditBtn = createTodoElement('button', 'Edit', 'edit')
  const todoSaveBtn = createTodoElement('button', 'Save', 'save')
  todoCheckCreate.setAttribute('type', 'checkbox')

  todoIconBoxCreate.append(todoCheckCreate, todoEditBtn, todoSaveBtn)
  todoItemCreate.append(todoTextCreate, todoIconBoxCreate)
  todoItems.append(todoItemCreate)

  todoEditBtn.addEventListener('click', () => {
    todoInput.value = data[index]
    todoInput.focus()
    todoEditBtn.style.display = 'none'
    todoSaveBtn.style.display = 'inline-block'
  })

  todoSaveBtn.addEventListener('click', () => {
    data[index] = todoInput.value
    setLocalStorage('data', data)
    todoTextCreate.textContent = todoInput.value
    todoInput.value = ''
    todoEditBtn.style.display = 'inline-block'
    todoSaveBtn.style.display = 'none'
  })

  todoCheckCreate.onchange = () => {
    todoTextCreate.classList.toggle('line')
  }
}

addTodo.addEventListener('click', e => {
  e.preventDefault()
  if (todoInput.value === '') {
    validationText.textContent = 'Todo Qeyd edin'
    return
  }
  data.push(todoInput.value)
  createTodo(todoInput.value, data.length - 1)
  setLocalStorage('data', data)
  validationText.textContent = ''
  todoInput.value = ''
  todoInput.focus()
})

deleteAll.addEventListener('click', () => {
  data = []
  localStorage.clear()
  todoItems.innerHTML = ''
})

document.body.onkeypress = e => (e.key === 'Enter' ? addTodo.click() : null)

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
