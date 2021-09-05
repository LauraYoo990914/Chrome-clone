const clock = document.querySelector("#clock h1");

//clock

function handleClock(){
 const date = new Date();
 const hours = String(date.getHours()).padStart(2,"0");
 const minutes = String(date.getMinutes()).padStart(2,"0");
 const seconds = String(date.getSeconds()).padStart(2,"0");
 clock.innerText =`${hours}:${minutes}:${seconds}`;
}

handleClock();
setInterval(handleClock,1000);

//todo list

const toDoForm = document.querySelector("#toDo-form");
const toDoInput = document.querySelector("#toDo-form input");
const toDoTitle = document.querySelector("#toDo-form h1")
const toDoList = document.querySelector("#toDo-list");

const TODOS_KEY = "todo";
let toDos = [];


function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

function handleDelete(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo)=> toDo.id !== parseInt(li.id));
    saveToDos();
    if(toDos.length < 3 && toDos.length >= 1){
        toDoInput.classList.remove(HIDDEN_CLASSNAME);
        toDoTitle.style=`margin-top:0px`;
        toDoTitle.innerText=`Let's add another task 💯`;
    } else if(toDos.length == 0){
        toDoTitle.style=`margin-top:40px`;
        toDoTitle.innerText=`You have finished all your tasks for today 🥳 `;
    }
    console.log(toDos.length);
}

function paintToDo(todo){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    li.id=todo.id;
    span.innerText=todo.text;
    btn.innerText="❌";
    btn.addEventListener("click",handleDelete);
    span.classList.add("toDo-font");
    btn.classList.add("toDo-btn");
    li.appendChild(btn);
    li.appendChild(span);
    toDoList.appendChild(li);
}


function handleToDoForm(event){
    event.preventDefault();
    const toDo = toDoInput.value;
    toDoInput.value ="";
    const toDoObj = {
        text : toDo,
        id : Date.now(),
    }
    if(toDos.length >= 3){
        toDoInput.classList.add(HIDDEN_CLASSNAME);
        toDoTitle.style=`margin-top:40px`;
        toDoTitle.innerText = `You already have enough to tasks for today😤`
    } else{
    toDos.push(toDoObj);
    paintToDo(toDoObj);
    saveToDos();
    }
}

toDoForm.addEventListener("submit",handleToDoForm);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
   const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

//login
const inputForm = document.querySelector("#login-form");
const inputName = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY ="username";

function handleFormSubmit(event){
    event.preventDefault();
    const username = inputName.value;
    paintGreeting(username);
    localStorage.setItem(USERNAME_KEY,username);
    inputForm.classList.add(HIDDEN_CLASSNAME);
}

function paintGreeting(username){
    greeting.classList.remove(HIDDEN_CLASSNAME);
    toDoForm.classList.remove(HIDDEN_CLASSNAME);
    clock.classList.remove(HIDDEN_CLASSNAME);
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const parsedHours = parseInt(hours);
    if(parsedHours>=0 && parsedHours<12){
        greeting.innerText=`Good Morning,${username}.`;
    } else if(parsedHours>=12 && parsedHours<18){
        greeting.innerText=`Good Afternoon,${username}.`;
    } else{
        greeting.innerText=`Good Evening,${username}.`;
    }
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null){
    inputForm.classList.remove(HIDDEN_CLASSNAME);
    inputForm.addEventListener("submit",handleFormSubmit)
}else{
    paintGreeting(savedUsername);
}

//background

const colors = [
    "#ef5777",
    "#575fcf",
    "#4bcffa",
    "#34e7e4",
    "#0be881",
    "#f53b57",
    "#3c40c6",
    "#0fbcf9",
    "#00d8d6",
    "#05c46b",
    "#ffc048",
    "#ffdd59",
    "#ff5e57",
    "#d2dae2",
    "#485460",
    "#ffa801",
    "#ffd32a",
    "#ff3f34",
];

function backgroundColor(){
      const color1 = colors[Math.floor(Math.random()*(colors.length))];
      const color2 = colors[Math.floor(Math.random()*(colors.length))];
      if (color1 === color2){
          return backgroundColor();
      }
      document.body.style.background=`linear-gradient(to left,${color1},${color2})`;
      console.log(color1);
      console.log(color2);
  }

backgroundColor();

function geoTrue(position){
    const weather = document.querySelector("#weather span:first-child");
    const city = document.querySelector("#weather span:last-child");
    const APIkey = "904bbc97d7b068781fd89bc51f73ff56";
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
    fetch(url).then((response) => response.json()).then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}°C`;
    });
}

function geoFalse(){
    alert("Your computer is not connected to the internet");
}

navigator.geolocation.getCurrentPosition(geoTrue,geoFalse);
