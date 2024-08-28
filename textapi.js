const url0 = 'https://dummyjson.com/todos/?limit=0'; 
var addTodoButton = document.getElementById('Addtodo');        
var toDoContainer = document.getElementById('toDoContainer');  // container of all todo
var inputField = document.getElementById('inputField');
var TodoList = [] , List=[];        // // to get all elements of the API and store in to Tododo list
var data , datas , url;
var numberOfItems = 15;
var first = 0;
var last = 149;
var actualPage =1;
const pginfo = document.getElementById('pginfos');

const Option1 ={       // Methods to get elements of the API
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
    }
}
async function getallementofapi(){
    data =  await fetch(url0, Option1);
    datas = await data.json()                // parse elements into json object.
    datas.todos.forEach(element =>{
        TodoList.push(element);            // to add element in to our Todolist.
    });
    console.log(TodoList);
    
}
getallementofapi();


addTodoButton.onclick = async function() {  // To add new todo
    if(inputField.value !=""){
        var paragraph = document.createElement('p');  //create parapgraph element who will contain the todo and will be added to todolist
    }

    paragraph.innerText = inputField.value;
    paragraph.classList.add('paragraph_style');
    toDoContainer.appendChild(paragraph);
    inputField.value = "";
    paragraph.addEventListener("click",newAdd)
    
}

function emptyContainer(){
    toDoContainer.innerHTML = '';
}


function nextPage(){
    if(first+numberOfItems < TodoList.length){
        first+=numberOfItems;
        actualPage++;
        GetallTodo();
    }
}

function previousPage(){
    if(first-numberOfItems >=0){
        first-=numberOfItems
        actualPage--;
        GetallTodo();
    }
    

}


function GetallTodo(){
    emptyContainer();
    for(i=first ; i < first+numberOfItems; i++){
     let element = document.createElement('p');
     element.id=i;
     element.innerText = TodoList[i].todo           // add a task to hour todo list .

     if (TodoList[i].todo == undefined){continue;}
     element.classList.add('paragraph_style')      // add style paragraph.
     toDoContainer.appendChild(element); // add to container.
     element.addEventListener('click', showparameters); // when you click two once it's remove task.

     pginfo.innerText = actualPage + "/10";


    }
}





function showparameters(e){
    emptyContainer();

    let element1 = document.createElement('p');
    element1.id = e.target.id;
    element1.innerText = "The Id of the ask is : " + TodoList[e.target.id].id;
    element1.classList.add('paragraph_style') // add style paragraph;
    element1.style.backgroundColor='green';
    toDoContainer.appendChild(element1);
   

    let element2 = document.createElement('p');
    element2.innerText ="Description of task is : " + TodoList[e.target.id].todo;  // task description
    element2.classList.add('paragraph_style') // add style paragraph
    element2.style.backgroundColor='green';
    toDoContainer.appendChild(element2); 

    let element3 = document.createElement('p');
    element3.innerText = "Status of task is: " + TodoList[e.target.id].completed; // status of task
    element3.classList.add('paragraph_style')
    element3.style.backgroundColor='green';
    toDoContainer.appendChild(element3);

    let element4 = document.createElement('p');
    element4.innerText  = "Task of userid is: " + TodoList[e.target.id].userId // access of userid 
    element4.classList.add('paragraph_style')
    element4.style.backgroundColor='green';
    toDoContainer.appendChild(element4);

    let bt1 = document.createElement('button');
    bt1.innerText = "Update Task";
    bt1.style.backgroundColor='blue';
    bt1.id = "button1"
    let bt2 = document.createElement('button');
    bt2.innerText = "Delete Task";
    bt2.id = "button2"
    bt2.style.backgroundColor = "red";
    toDoContainer.appendChild(bt1);
    toDoContainer.appendChild(bt2);

    const button1 = document.getElementById('button1');   // button to update the task.
    const button2 = document.getElementById('button2');   // button to delete the task.
    button1.addEventListener('click',updateTask);        // add the event to alert the operation.
    button2.addEventListener('click',DeleteTask)         // add the event to alert the operation.

}


function DeleteTask(e){
    const idTask = prompt('set the value of idTask')    // value of the task
    delete TodoList[idTask-1].todo;                     // delete the task on our TodoList object
    let a = document.getElementById(idTask-1);          // select value of the task getting by idTask
    a.textContent='';
    a.classList.remove('paragraph_style');      // to remove paragraph style.
    toDoContainer.removeChild(a)               // to remove click on the task.
    console.log(TodoList);
    GetallTodo();
}


function updateTask(e){
    const idTask = prompt("Enter value of Id task");
    let newText = prompt('Set a new value of textcontainer'); // set new value of textcontainer
    TodoList[idTask-1].todo = newText;      // modify todo list item.
    GetallTodo();                   // get all task with modifications.


}


function newAdd(e){
    let bt1 = document.createElement('button');          // create new element of type "button"
    bt1.innerText = "Update Task";                      // set name of  bt1
    bt1.style.backgroundColor='blue';                // set background color blue to button1(update task)
    bt1.id = "button1"                               // set id= button1
    let bt2 = document.createElement('button');     // create new button.
    bt2.innerText = "Delete Task";                 // set name of button bt2
    bt2.id = "button2"                            // set id= button2
    bt2.style.backgroundColor = "red";            // give red color to button2(delete)
    toDoContainer.appendChild(bt1);              // append button 1 to container.
    toDoContainer.appendChild(bt2);             // append button 2 to container.

    const button1 = document.getElementById('button1');   // button to update the task.
    const button2 = document.getElementById('button2');   // button to to delete the task
    button1.addEventListener('click',updateNewTask);
    button2.addEventListener('click',deleteNewTask);
}


function updateNewTask(e) {
    emptyContainer();
    const newText = prompt("pleaser enter the new value of task")
    let para = document.createElement('p');
    para.innerText = newText;               // to add new value of todo in the markup.
    para.classList.add('paragraph_style');  // add class list paragraph style
    toDoContainer.appendChild(para)   // append the paragraph in the todo  container.
    newAdd(para);  // We can modify again the new containt who were added.
}


function deleteNewTask(e) {
    emptyContainer()        // to remove new task.
    GetallTodo() // to show all other tasks.
}




























 
    