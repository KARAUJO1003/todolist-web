const button = document.querySelector('.addTaskBtn')
const input = document.querySelector ('.input-task')
const listaCompleta = document.querySelector ('.listTasks') 
const checkBoxMode = document.getElementById("check-box-theme")
const themeSystem = localStorage.getItem("themeSystem") || "light"
const modal = document.querySelector('dialog')
const modalClose = document.querySelector('dialog button')

checkBoxMode.addEventListener('click', trocarTema) 

function trocarTema () {
    
    let oldTheme = localStorage.getItem("themeSystem") || "light"
    let newTheme = oldTheme == "light" ? "dark" : "light"

    localStorage.setItem("themeSystem", newTheme)
    defineCurrentTheme(newTheme)
}


function defineCurrentTheme(theme){

const darksvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>'
const lightsvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>'

document.documentElement.setAttribute ("data-theme", theme)

    if (theme == "light")
    {
        checkBoxMode.innerHTML = lightsvg;
    }else
    {
        checkBoxMode.innerHTML = darksvg;
    }

    const root = document.documentElement;

    if (theme === 'dark') {
      root.style.setProperty('--dark-color-primary', '#111');
      root.style.setProperty('--light-color-primary', '#f0f9ff');
      root.style.setProperty('--light-color-secondary', '#f0f8ff');
      // Defina outras variáveis CSS de acordo com o tema escuro 
      /*
    --dark-color-primary: #111;
    --light-color-primary:#f0f9ff;
    --light-color-secondary:#f0f8ff;
      */
    } else {
        root.style.setProperty('--dark-color-primary', '#f0f9ff');
        root.style.setProperty('--light-color-primary', '#111');
        root.style.setProperty('--light-color-secondary', '#1a1a1a');
      // Defina outras variáveis CSS de acordo com o tema claro
    }
}
defineCurrentTheme(themeSystem)

let taskList = []

function addTask (){
    const inputValue = input.value.trim(); // Remove espaços em branco do início e do fim.

    if (inputValue !== '') {
      taskList.push({
        tarefa: inputValue,
        done: false
      });
  
      input.value = '';
      showTask();
    } else {
      // Adicione aqui a lógica para mostrar uma mensagem de erro ou fornecer feedback ao usuário.
        modal.showModal()
    }

    modalClose.addEventListener('click', function() {
    modal.close()
    })

}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}


function showTask (){
    
    let newList = ''
    
    taskList.forEach((item, index) =>{

        const checkboxsvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M7 5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2H7zm0 12V7h10l.002 10H7z"></path></svg>'
        const checked = '<svg class="greenchk" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M7 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm4 10.414-2.707-2.707 1.414-1.414L11 12.586l3.793-3.793 1.414 1.414L11 15.414z"></path></svg>'
        const iconSrc = item.done ? checked : checkboxsvg;

        


    newList = newList + `
        <li class="tasks ${item.done && "feito"}">
            <span class="check-icon ${item.done && "verde"}"  onclick="checkTask(${index})">${iconSrc}</span>
            <p>${item.tarefa}</p>
            <img class="delete-icon" src="pages/src/delete.png" alt="unCheck-icon" onclick="deletarItem(${index})">
        </li>
        `    
    })
    
    listaCompleta.innerHTML = newList

    localStorage.setItem('list', JSON.stringify(taskList))
}

function deletarItem(index){
    taskList.splice(index, 1)

    showTask()
}

function checkTask (index){
    taskList[index].done = !taskList[index].done

    showTask()
}

function recarregarTarefas(){

    const localStorageTask = localStorage.getItem('list')

    if(localStorageTask){
        
        taskList = JSON.parse(localStorageTask)
    
    }


    showTask()

}
recarregarTarefas()

button.addEventListener('click', addTask)
input.addEventListener('keydown', handleEnterKey);