const todoForm = document.querySelector('#todo-form');  
const todoInput = document.querySelector('#todo-input');  
const todoList = document.querySelector('#todo-list'); 

//let userTasks = JSON.parse(localStorage.getItem('userTasks')) || [];
let userTasks = JSON.parse(localStorage.getItem('userTasks')) || [];
let savedTasks = JSON.parse(localStorage.getItem('userTasks'));

if(savedTasks!==null){
    updateFunc(savedTasks);
}


function updateFunc(savedTasks){
    for(let obj of savedTasks){
        const savedTask = document.createElement('div');	
        const savedChk = document.createElement('input');
        const savedDelBtn = document.createElement('button');

        savedTask.innerText = obj.name;
        savedTask.setAttribute('id',obj.id);
        savedTask.className = 'unchecked';
        
        savedDelBtn.innerHTML = '&#128465;';
        savedDelBtn.setAttribute('id',obj.id);

        savedChk.type = 'checkbox';
        savedChk.setAttribute('id',obj.id);
        savedChk.checked = obj.isChecked;
        
        if(obj.isChecked===true){
            savedTask.className = 'checked';
            savedTask.style.color = 'gray';
            savedTask.style.textDecoration = 'line-through';
        } 
        
        savedTask.prepend(savedChk);
        savedTask.appendChild(savedDelBtn);
        todoList.prepend(savedTask); 
    }
}

// delete task or check completed
todoList.addEventListener('click', function(event) {
	const taskId = event.target.id;
    let taskChk = event.target.checked;
    if (event.target.tagName === 'BUTTON') {
		removeFunc(taskId);
        event.target.parentElement.remove();
	} else {
        if(event.target.checked === true){
            event.target.parentElement.style.textDecoration = 'line-through';
            event.target.parentElement.style.color = 'lightgray';
        } else {
            event.target.parentElement.style.textDecoration = 'none';
            event.target.parentElement.style.color = 'black';
        }
        toggleCheck(taskId, taskChk);
    }
});

//remove item from userTasks and remove from local storage
function removeFunc(taskId){
    for(let obj of userTasks){      
        if(obj.id == taskId){
            let removeIndex = userTasks.findIndex(task=>task.id==taskId);
            userTasks.splice(removeIndex,1);
            setLocalStorage(userTasks);
        }
    }
}

//update local storage for checkbox
function toggleCheck(taskId, taskChk){    
    for(let obj of userTasks){      
        if(obj.id == taskId){
            if(taskChk === true){
                obj.isChecked = true;
            } else {
                obj.isChecked = false;
            }
            setLocalStorage(userTasks);
        }
    }
}

//form submit
todoForm.addEventListener('submit', function(event) {
	event.preventDefault();
    
    let userTask = {
        id: new Date().getTime(),
        name: todoInput.value,
        isChecked: false
    }
    userTasks.push(userTask);
    setLocalStorage(userTasks);
    createTask(userTask);

});

//function to create task & add to list
function createTask(userTask) {
    const newTask = document.createElement('div');	
    const newChk = document.createElement('input');
    const newDelBtn = document.createElement('button');

    newDelBtn.innerHTML = '&#128465;';
    newDelBtn.setAttribute('id',userTask.id);

    newChk.type = 'checkbox';
    newChk.setAttribute('id',userTask.id);

    newTask.innerText = todoInput.value;
    newTask.className = 'line-item';
    newTask.setAttribute('id',userTask.id);

    newTask.prepend(newChk);
    newTask.appendChild(newDelBtn);
    todoList.prepend(newTask);
    todoInput.value = '';
}

function setLocalStorage(userTasks){
    localStorage.setItem('userTasks',JSON.stringify(userTasks));
}