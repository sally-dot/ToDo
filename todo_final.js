const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

// todo 리스트 만드는 기능
const createTodo = (todoContents, isComplete) => {
  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newDiv = document.createElement("div");
  const newBtn = document.createElement("button");
  newSpan.classList.toggle("text");
  newDiv.classList.toggle("delete");

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    saveItemsFn();
  });

  newDiv.addEventListener("click", () => {
    newLi.remove();
    saveItemsFn();
  });

  if (isComplete) {
    newLi.classList.add("complete");
  }

  newDiv.textContent = "x";
  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  newLi.appendChild(newDiv);
  todoList.appendChild(newLi);
  todoInput.value = "";
  saveItemsFn();
};

// key code 확인 후 createTodo로 전달 기능 (가장 초기값)
const keyCodeCheck = () => {
  if (window.event.keyCode === 13 && todoInput.value.trim() !== "") {
    createTodo(todoInput.value.trim());
  }
};

// 전체삭제 버튼 기능
const deleteAll = () => {
  todoList.innerHTML = "";
  saveItemsFn();
};

// todo 리스트 로컬스토리지 저장 기능
const saveItemsFn = () => {
  const saveItems = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItems.push(todoObj);
  }

  saveItems.length === 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-items", JSON.stringify(saveItems));
};

// 로컬스토리지에 저장된 데이터 불러오기 기능
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

// 로컬스토리지 기반의 데이터 createTodo 함수로 전달
if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    const { contents, complete } = savedTodoList[i];
    createTodo(contents, complete);
  }
}
