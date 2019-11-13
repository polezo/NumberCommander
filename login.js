let loggedIn = false
let currentUsername
let currentUserId

document.addEventListener("DOMContentLoaded", () => {
  getLoginForm().addEventListener("submit", submitLogin)

  getLogOutBtn().addEventListener("click", logOut)
});

function getLoginForm(){
  return document.querySelector("#login-form")
}

function getLogOutBtn(){
  return document.querySelector("#logout-button")
}

function getPointsContainer(){
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

  getLoginForm().style.display = "none"
  getLogOutBtn().style.display = "inline-block"
  displayPointsCounter()
  console.log(loggedIn, currentUsername, currentUserId)
}

function logOut(){
  event.preventDefault();
  loggedIn = false
  currentUsername = ""
  currentUserId = ""
  gameId = ""

  getPointsContainer().innerHTML=""
  getLogOutBtn().style.display = "none"
  getLoginForm().style.display = "inline-block"
}

function displayPointsCounter(){
  getPointsContainer().innerHTML=""
  
  let greetingP = document.createElement("p")
  greetingP.innerText = `GREETINGS COMMANDER ${currentUsername.toUpperCase()}`

  let pointsH2 = document.createElement("h2")
  pointsH2.id = "pointsCounter"
  pointsH2.innerText = "Points: 0"

  getPointsContainer().append(greetingP, pointsH2)
}

