const button = document.querySelector('.addTaskBtn')
const input = document.querySelector ('.input-task')
const listaCompleta = document.querySelector ('.listTasks') 


let taskList = []

function addTask (){
    taskList.push({
        tarefa:input.value,
        done: false
    })

    input.value = ''

    showTask()
}


function showTask (){
    
    let newList = ''
    
    taskList.forEach((item, index) =>{
    
        const iconSrc = item.done ? './src/check.png' : './src/unCheck.png';

    newList = newList + `
        <li class="tasks">
            <img class="check-icon" src="${iconSrc}" alt="check-icon" onclick="checkTask(${index})">
            <p>${item.tarefa}</p>
            <img class="delete-icon" src="./src/delete.png" alt="unCheck-icon" onclick="deletarItem(${index})">
        </li>
        `    
    })
    
    listaCompleta.innerHTML = newList
}

function deletarItem(index){
    taskList.splice(index, 1)

    showTask()
}

function checkTask (index){
    taskList[index].done = !taskList[index].done

    showTask()
}

button.addEventListener('click', addTask)