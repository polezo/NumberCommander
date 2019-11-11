let level = "1"

let levelInfo = {
  "randFactor": 6,
  "name" : "Easy"
}

document.addEventListener("DOMContentLoaded", () => {

  renderLevel()

  let levelSlider = document.querySelector("#level-slider")
  levelSlider.addEventListener("input", () => {
    level = event.currentTarget.value
    difficulty(level)
    renderLevel()
  })

  let additionBtn = document.querySelector("#addition")
  additionBtn.addEventListener('click', () => {
    generateExpression("add", difficulty(level))
  })

  let subtractionBtn = document.querySelector("#subtraction")
  subtractionBtn.addEventListener("click", () => {
    generateExpression("sub", difficulty(level))
  })

  let multiplicationBtn = document.querySelector("#multiplication")
  multiplicationBtn.addEventListener("click", () => {
    generateExpression("mult", difficulty(level))
  })
  
});

function difficulty(level){
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

function generateExpression(operator, randFactor){
  let expressionContainer = document.querySelector("#expression")
  expressionContainer.innerText = ""

  let num1 = Math.floor(Math.random() * randFactor)
  let num2 = Math.floor(Math.random() * randFactor)

  while ( operator === "sub" && num1 < num2 ){
    num1 = Math.floor(Math.random() * randFactor)
  }

  let operationSymbol = {
    "add": "+",
    "sub": "-",
    "mult": "*"
  }

  let evaluate = {
    "add" : num1 + num2,
    "sub" : num1 - num2,
    "mult" : num1 * num2
  }
  
  expressionContainer.append(`${num1} ${operationSymbol[operator]} ${num2}`)
  
  let solution = evaluate[operator]

  generateNumbers(solution, difficulty(level))
}

function generateNumbers(solution, randFactor){
  let numbersArray = []
  numbersArray.push(solution)

  let i = 0
  while (i < 4) {
    let num
    num = Math.floor(Math.random() * randFactor * 2)
    numbersArray.push(num)
    i++
  }

  renderSolutionCards(numbersArray)
}

function renderSolutionCards(numbersArray){
  let solutionCards = document.getElementsByClassName("solution-card")
  let i = 0

  Array.from(solutionCards).forEach(function(card){
    card.innerText = numbersArray[i]
    i++
  })
}