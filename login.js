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
  loggedIn = !loggedIn
  currentUsername = user.username
  currentUserId = user.id

  getLoginForm().style.display = "none"
  getLogOutBtn().style.display = "inline-block"
  displayPointsCounter()
  console.log(loggedIn, currentUsername, currentUserId)
}

function logOut(){
  event.preventDefault();
  loggedIn = !loggedIn
  currentUsername = ""
  currentUserId = ""
  gameId = ""

  getLogOutBtn().style.display = "none"
  getLoginForm().style.display = "inline-block"
}

function displayPointsCounter(){
  let pointsContainer = document.querySelector("#points-container")
  pointsContainer.innerHTML = ""
  
  let greetingP = document.createElement("p")
  greetingP.innerText = `GREETINGS COMMANDER ${currentUsername.toUpperCase()}`

  let pointsH2 = document.createElement("h2")
  pointsH2.id = "pointsCounter"
  pointsH2.innerText = "Points: 0"

  pointsContainer.append(greetingP, pointsH2)
}

