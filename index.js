let level = "1"
let badGuySpeed = 0.19
let levelInfo = {
  "randFactor": 6,
  "name" : "Easy"
}
let operator = "add"
let gameId

document.addEventListener("DOMContentLoaded", () => {
  renderLevel()

  let levelSlider = document.querySelector("#level-slider")
  levelSlider.addEventListener("input", () => {
    level = event.currentTarget.value
    setDifficulty(level)
    renderLevel()
  })

  let additionBtn = document.querySelector("#addition")
  additionBtn.addEventListener('click', () => {
    operator = "add"

    if (loggedIn) {
      createNewGame(operator)
    }

    startGame()
    // generateExpression(operator, levelInfo)
  })

  let subtractionBtn = document.querySelector("#subtraction")
  subtractionBtn.addEventListener("click", () => {
    operator = "sub"

    if (loggedIn) {
      createNewGame(operator)
    }

    startGame()
    // generateExpression("sub", levelInfo)
  })

  let multiplicationBtn = document.querySelector("#multiplication")
  multiplicationBtn.addEventListener("click", () => {
    operator = "mult"

    if (loggedIn) {
      createNewGame(operator)
    }

    startGame()
    // generateExpression("mult", levelInfo)
  })
  
});

function createNewGame(operator){
  let data = {
    user_id: currentUserId,
    game_type: operator,
    score: 0
  }
  
  fetch('http://localhost:3000/games', {
  method: "POST", 
  headers: {
    "Content-Type" : "application/json"
  }, 
  body: JSON.stringify(data)
  })
  .then( response => response.json() )
  .then( function(newGame){
    gameId = newGame.id
    console.log(newGame)
  } )
}

function startGame() {
  scene.remove(logo);
  expressionToggle = true;
  statsContainer().innerHTML = ""
  badGuys = getEnemies(32)
  badGuys2 = getEnemies(100)
  renderExpression(expression1);
  renderNext(expressionTwo);
  playing = true;
  points = 0;
  document.getElementById("buttons").classList.add("hidden")
  document.getElementById("nextExp").classList.remove("hidden")
  document.querySelector("#expression").classList.add("game-started")
  document.querySelector("#expression").classList.remove("blinking")
  document.getElementById("title").classList.add("title-game-started")

}

function setDifficulty(level){
  switch (level) {
    case "1":
      levelInfo.randFactor = 7;
      levelInfo.name = "Easy";
      badGuySpeed = 0.19
      break;

    case "2": 
      levelInfo.randFactor = 14;
      levelInfo.name = "Harder";
      badGuySpeed = 0.23
      break;

    case "3":
      levelInfo.randFactor = 21;
      levelInfo.name = "Hardest";
      badGuySpeed = 0.29
      break;
  }
  return levelInfo
}

function renderLevel() {
  levelDiv = document.querySelector(".level-value")
  levelDiv.innerText = levelInfo.name
}

function generateExpression(operator, levelInfo){
  let num1 = Math.ceil(Math.random() * levelInfo.randFactor)
  let num2 = Math.ceil(Math.random() * levelInfo.randFactor)

  while ( operator === "sub" && num1 < num2 ){
    num1 = Math.ceil(Math.random() * levelInfo.randFactor)
  }

  let evaluate = {
    "add" : num1 + num2,
    "sub" : num1 - num2,
    "mult" : num1 * num2
  }
  
  let solution = evaluate[operator]
  solutionSpace = solution
  generateNumbers(solution, levelInfo)
  let arr = [operator, num1, num2];
  return arr;
}

let operationSymbol = {
  "add": "+",
  "sub": "-",
  "mult": "*"
}

function renderExpression(arr){
  let expressionContainer = document.querySelector("#expression")
  expressionContainer.innerText = ""

  expressionContainer.append(`${arr[1]} ${operationSymbol[arr[0]]} ${arr[2]} =`)
  
}

function renderNext(arr) {
  let nextContainer = document.querySelector("#nextExp")
  nextContainer.innerText = ""

  nextContainer.append(`Next: ${arr[1]} ${operationSymbol[arr[0]]} ${arr[2]}`)
  
}

function generateNumbers(solution, levelInfo){
  let numbersArray = []
  numbersArray.push(solution)

  let i = 0
  while (i < 4) {
    let num
    num = Math.floor(Math.random() * levelInfo.randFactor * 2)
    numbersArray.push(num)
    i++
  }

  // renderSolutionCards(myArray)
  myArray = numbersArray
}

function renderSolutionCards(numbersArray){
  let solutionCards = document.getElementsByClassName("solution-card")
  let i = 0

  Array.from(solutionCards).forEach(function(card){
    card.innerText = numbersArray[i]
    i++
  })
}

let expressionToggle = true;
let expression1 = []
let expressionTwo = []

function toggleExpression() {
  if (expressionToggle) {
    expression1 = generateExpression(operator, levelInfo)
    expressionToggle = !expressionToggle
  } else {
    expressionTwo = generateExpression(operator, levelInfo)
    expressionToggle = !expressionToggle
  }
}

function persistPoints(points){
  data = { score: points }
  
  fetch(`http://localhost:3000/games/${gameId}`, {
    method: "PATCH", 
    headers: {
      "Content-Type" : "application/json"
    }, 
    body: JSON.stringify(data)
  })
    .then( response => response.json() )
    .then( function(updatedGame){
      document.getElementById("pointsCounter").innerText = `Points this round: ${updatedGame.score}`
      if (updatedGame.score === 10) {
        youWin()
      } 
    } )
}