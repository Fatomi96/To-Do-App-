// target all necessary element ---done
// listen on the input elememt --> onkeyup
// listen on the btn elememt --> onclick
// show the list of task
//show the number of pending tasks
// making the list delete button functional
// listen on the clear all button --> onclick

let inputField = document.querySelector(".my_input input");
// console.log(inputField)
let addBtn = document.querySelector(".my_input button");
// console.log(addBtn)
let clearAllBtn = document.querySelector(".todo_footer button");
// console.log(clearAllBtn)
let todoList = document.querySelector(".atm_List");
// console.log(todoList)

// listen on the input elememt --> onkeyup
inputField.onkeyup = () => {
  let theInputValue = inputField.value;
  if (theInputValue.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

// listen on the btn elememt --> onclick
toDisplayList();
addBtn.onclick = () => {
  let theInputValue = inputField.value;
  let getLocalStorageData = localStorage.getItem("New List");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  listArray.push(theInputValue);
  localStorage.setItem("New List", JSON.stringify(listArray));
  toDisplayList();
  addBtn.classList.remove("active");
};

// show the list of task
function toDisplayList() {
  let getLocalStorageData = localStorage.getItem("New List");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const pendingTasks = document.querySelector(".pending_tasks");
  pendingTasks.textContent = listArray.length;
  if (listArray.length > 0) {
    clearAllBtn.classList.add("active");
  } else {
    clearAllBtn.classList.remove("active");
  }
  let newLi = "";
  listArray.forEach((element, index) => {
    newLi += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLi;
  inputField.value = "";
}

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New List");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem("New List", JSON.stringify(listArray));
  toDisplayList();
}

// listen on the clear all button
clearAllBtn.onclick = () => {
  let getLocalStorageData = localStorage.getItem("New List");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
    listArray = [];
  }
  localStorage.setItem("New List", JSON.stringify(listArray));
  toDisplayList();
};
