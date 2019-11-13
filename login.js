let loggedIn = false
let currentUsername
let currentUserId

document.addEventListener("DOMContentLoaded", () => {
  loginForm().addEventListener("submit", submitLogin)
  statsBtn().addEventListener("click", toggleStats)
  logOutBtn().addEventListener("click", logOut)
});

// _______________DOM NODES_______________
function loginForm(){
  return document.querySelector("#login-form")
}

function logOutBtn(){
  return document.querySelector("#logout-button")
}

function statsContainer(){
  return document.querySelector("#stats-container")
}
function pointsContainer(){
  return document.querySelector("#points-container")
}

function statsBtn() {
  return document.querySelector("#stats")
}

// END_______________DOM NODES_______________

function fetchAndRenderUserStats(){
  fetch(`http://localhost:3000/users/${currentUserId}`)
  .then( response => response.json() )
  .then( user =>{ renderUserStats(user)})
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
  statsBtn().classList.remove("hidden")
  // renderUserStats(user)
  displayPointsCounter()
  console.log(loggedIn, currentUsername, currentUserId)
}

function logOut(){
  event.preventDefault();
  loggedIn = false
  currentUsername = ""
  currentUserId = ""
  gameId = ""

  pointsContainer().innerHTML=""
  statsContainer().innerHTML=""
  logOutBtn().style.display = "none"
  loginForm().style.display = "inline-block"
}

function renderUserStats(user){
  statsContainer().innerHTML = ""

  let additionPoints = 0
  let subtractionPoints = 0
  let multiplicationPoints = 0
  
  user.games.forEach(function(game) {
    if (game.game_type === "add"){
      additionPoints += game.score

    } else if (game.game_type === "sub"){
      subtractionPoints += game.score

    } else if (game.game_type === "mult"){
      multiplicationPoints += game.score
    }
  })

  let additionP = document.createElement("p")
  additionP.id = "addition-li"
  additionP.innerText = `Addition: ${additionPoints}`

  let subtractionP = document.createElement("p")
  subtractionP.id = "addition-li"
  subtractionP.innerText = `Subtraction: ${subtractionPoints}`

  let multiplicationP = document.createElement("p")
  multiplicationP.id = "addition-li"
  multiplicationP.innerText = `Multiplication: ${multiplicationPoints}`

  statsContainer().append(additionP, subtractionP, multiplicationP)
}

function displayPointsCounter(){
  pointsContainer().innerHTML=""
  
  let greetingP = document.createElement("p")
  greetingP.innerText = `GREETINGS COMMANDER ${currentUsername.toUpperCase()}`

  let pointsH2 = document.createElement("h2")
  pointsH2.id = "pointsCounter"
  pointsH2.innerText = "Points this round: 0"

  pointsContainer().append(greetingP, pointsH2)
}

let statsToggle = false;

function toggleStats() {
  statsToggle = !statsToggle
  if (statsToggle){
    fetchAndRenderUserStats()
  } else {
    statsContainer().innerHTML = ""
  }
}