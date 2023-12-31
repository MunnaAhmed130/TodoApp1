//Selectors
const todoInput = document.querySelector(".addTodo");
const todoBtn = document.querySelector(".addTodoBtn");
const todoList = document.querySelector(".todoList");
const filterTodo = document.querySelector(".filterTodo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", editList);
filterTodo.addEventListener("click", filterTodos);

//functions
function addTodo(event) {
    // prevent form submitting
    event.preventDefault();

    if (!todoInput.value == "") {
        const divTodo = document.createElement("div");
        divTodo.classList.add("todo");
        // create List
        const newTodo = document.createElement("li");
        // console.log(todoInput.value)

        saveLocalTodos(todoInput.value);
        newTodo.innerText = todoInput.value;

        todoInput.value = "";
        newTodo.classList.add("todoItem");

        divTodo.appendChild(newTodo);
        // add to local Storage

        // Check button
        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "<i class='fa-solid fa-check'></i>";
        completeBtn.classList.add("completeBtn");
        divTodo.appendChild(completeBtn);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
        deleteBtn.classList.add("deleteBtn");
        divTodo.appendChild(deleteBtn);

        // append to List
        todoList.appendChild(divTodo);
    }
}

// deleteBtn.addEventListener("click", deleteItem);

function editList(e) {
    const item = e.target;
    // console.log(item)
    // item.remove();
    if (item.classList[0] === "deleteBtn") {
        const todo = item.parentElement;
        // animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", () => {
            todo.remove();
        });
        // todo.remove();
    }
    if (item.classList[0] === "completeBtn") {
        const todo = item.parentElement;
        todo.classList.toggle("completedItem");
        console.log(todo.innerText);
        // if (todo.classList.toggle) {
        //     saveCompleteTodos(todo.innerText,todo.classList)
        // }
        item.classList.toggle("completedBtn");
    }
}

function filterTodos(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completedItem")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "unCompleted":
                if (!todo.classList.contains("completedItem")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

// function saveCompleteTodos(todoText,todoClass) {
//     console.log(todoClass.value)
//     if (todoClass.value === "todo completedItem") {
//         let todos;
//         if (localStorage.getItem('todos') === null) {
//              todos = [];
//         } else {
//             todos = JSON.parse(localStorage.getItem("todos"));
//         }
//         todos.push(todoText, todoClass[1].value);
//         localStorage.setItem("todos", JSON.stringify(todos));
//     }

// }

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // console.log(todo)
    const todoItem = todo.children[0].innerText;
    const todoIndex = todos.indexOf(todoItem);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    // console.log(todoIndex);
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo) => {
        const divTodo = document.createElement("div");
        divTodo.classList.add("todo");
        // create List
        const newTodo = document.createElement("li");
        console.log(todoInput.value);

        newTodo.innerText = todo;
        newTodo.classList.add("todoItem");
        divTodo.appendChild(newTodo);
        // add to local Storage

        // Check button
        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "<i class='fa-solid fa-check'></i>";
        completeBtn.classList.add("completeBtn");
        divTodo.appendChild(completeBtn);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
        deleteBtn.classList.add("deleteBtn");
        divTodo.appendChild(deleteBtn);

        // append to List
        todoList.appendChild(divTodo);
    });
}
