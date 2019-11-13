let loggedIn = false
let currentUsername
let currentUserId

document.addEventListener("DOMContentLoaded", () => {
  loginForm().addEventListener("submit", submitLogin)

  logOutBtn().addEventListener("click", logOut)
});

function loginForm(){
  return document.querySelector("#login-form")
}

function logOutBtn(){
  return document.querySelector("#logout-button")
}

function pointsContainer(){
  return document.querySelector("#points-container")
}



function submitLogin(event){
  event.preventDefault();
  let username = event.currentTarget.username.value;
  let data = {username: `${username}`}
  
  fetch('http://localhost:3000/login', {
  method: "POST",
  headers: {
    "Content-Type" : "application/json"
  }, 
  body: JSON.stringify(data)
  })
  .then( response => response.json() )
  .then( user => loginHandler(user) )

  event.currentTarget.reset();
}

function loginHandler(user){
  loggedIn = true
  currentUsername = user.username
  currentUserId = user.id

  loginForm().style.display = "none"
  logOutBtn().style.display = "inline-block"
  displayPointsCounter()
  debugger
  console.log(loggedIn, currentUsername, currentUserId)
}

function logOut(){
  event.preventDefault();
  loggedIn = false
  currentUsername = ""
  currentUserId = ""
  gameId = ""

  pointsContainer().innerHTML=""
  logOutBtn().style.display = "none"
  loginForm().style.display = "inline-block"
}

function displayPointsCounter(){
  pointsContainer().innerHTML=""
  
  let greetingP = document.createElement("p")
  greetingP.innerText = `GREETINGS COMMANDER ${currentUsername.toUpperCase()}`

  let pointsH2 = document.createElement("h2")
  pointsH2.id = "pointsCounter"
  pointsH2.innerText = "Points: 0"

  pointsContainer().append(greetingP, pointsH2)
}

function renderUserStats(user){
  /*
  user has a key `games` which is an array of objects. 
  iterate 
  
  */
  let additionPoints
  let sub
}