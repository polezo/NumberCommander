let level = "1"

let levelInfo = {
  "randFactor": 6,
  "name" : "Easy"
}

let operator = "add"

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
    removeLevelWrapper()
    operator = "add"
    points = 0;
    if (badGuys) {
      scene.remove(badGuys)
      scene.remove(badGuys2)
    }
    badGuys = getEnemies(32)
    badGuys2 = getEnemies(100)
    playing =true;
    // generateExpression(operator, levelInfo)
  })

  let subtractionBtn = document.querySelector("#subtraction")
  subtractionBtn.addEventListener("click", () => {
    removeLevelWrapper()
    operator = "sub"
    points = 0;
    if (badGuys) {
      scene.remove(badGuys)
      scene.remove(badGuys2)
    }
    badGuys = getEnemies(32)
    badGuys2 = getEnemies(100)
    playing = true;
    // generateExpression("sub", levelInfo)
  })

  let multiplicationBtn = document.querySelector("#multiplication")
  multiplicationBtn.addEventListener("click", () => {
    removeLevelWrapper()
    points = 0;
    operator = "mult"
    if (badGuys) {
      scene.remove(badGuys)
      scene.remove(badGuys2)
    }
    badGuys = getEnemies(32)
    badGuys2 = getEnemies(100)
    playing = true;
    // generateExpression("mult", levelInfo)
  })
  
});

function removeLevelWrapper() {
  document.getElementById("level-wrapper").remove()
}

function setDifficulty(level){
  switch (level) {
    case "1":
      levelInfo.randFactor = 6;
      levelInfo.name = "Easy";
      break;

    case "2": 
      levelInfo.randFactor = 11;
      levelInfo.name = "Harder";
      break;

    case "3":
      levelInfo.randFactor = 21;
      levelInfo.name = "Hardest";
      break;
  }
  return levelInfo
}

function renderLevel() {
  levelDiv = document.querySelector(".level-value")
  levelDiv.innerText = levelInfo.name
}

function generateExpression(operator, levelInfo){
  let num1 = Math.floor(Math.random() * levelInfo.randFactor)
  let num2 = Math.floor(Math.random() * levelInfo.randFactor)

  while ( operator === "sub" && num1 < num2 ){
    num1 = Math.floor(Math.random() * levelInfo.randFactor)
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

function renderExpression(arr){
  let expressionContainer = document.querySelector("#expression")
  expressionContainer.innerText = ""

  let operationSymbol = {
    "add": "+",
    "sub": "-",
    "mult": "*"
  }

  expressionContainer.append(`${arr[1]} ${operationSymbol[arr[0]]} ${arr[2]}`)
  expressionContainer.classList.add("game-started")
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