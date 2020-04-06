const toDoForm = document.querySelector("form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");

const LOCAL_TODO = "local_todo";
let todos = [];

function checkTodo(event){
  const btn = event.target;
  const line = btn.parentNode;
  if(btn.innerText == "●"){
    line.querySelector('span').removeAttribute('class', 'finished');
    btn.innerText = "○";
  }else{
    line.querySelector('span').setAttribute('class', 'finished');
    btn.innerText = "●";
  }
}

function deleteTodo(event){
  const btn = event.target;
  const line = btn.parentNode;
  toDoList.removeChild(line);

  let cleanTodos = todos.filter(function(todo){
    return todo.id !== parseInt(line.id);
  });
  todos = cleanTodos;

  saveTodos();
}

function saveTodos(){
  localStorage.setItem(LOCAL_TODO, JSON.stringify(todos));

  const toDoCnt = document.getElementById("toDoCnt");
  toDoCnt.innerHTML = todos.length;
}

function reloadList(todo){
  const div = document.createElement("div");
  const newId = todos.length + 1;
  div.setAttribute('class','line');
  div.setAttribute('id', newId);
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  delBtn.setAttribute('class', 'delBtns')
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteTodo);
  checkBtn.setAttribute('class', 'checkBtns');
  checkBtn.innerText = "○";
  checkBtn.addEventListener("click", checkTodo);
  const span = document.createElement("span");
  span.innerText = todo;
  div.appendChild(checkBtn);
  div.appendChild(span);
  div.appendChild(delBtn);
  toDoList.appendChild(div);

  const toDoObj = {
    text:todo,
    id:newId
  }
  todos.push(toDoObj);
  saveTodos();  
}

function addList(event){
  // 페이지 reload block
  event.preventDefault();
  const newInput = toDoInput.value;
  reloadList(newInput);
  toDoInput.value="";
}

function loadList(){
  const loadedTodos = localStorage.getItem(LOCAL_TODO);
  if(loadedTodos !== null){
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(function(toDo){
      reloadList(toDo.text);
    });
  }
}

function init(){
  loadList();
  toDoForm.addEventListener("submit", addList);
}

init();