document.addEventListener("DOMContentLoaded", () => {

  let additionBtn = document.querySelector("#addition")
  additionBtn.addEventListener('click', () => {
    generateExpression("add")
  })

  let subtractionBtn = document.querySelector("#subtraction")
  subtractionBtn.addEventListener("click", () => {
    generateExpression("sub")
  })

  let multiplicationBtn = document.querySelector("#multiplication")
  multiplicationBtn.addEventListener("click", () => {
    generateExpression("mult")
  })
});

function generateExpression(operator){
  let expressionContainer = document.querySelector("#expression")
  expressionContainer.innerText = ""

  let num1 = Math.floor(Math.random()*10)
  let num2 = Math.floor(Math.random()*10)

  if ( operator === "sub" && num1 < num2 ){
    let diff = Math.abs(num1 - num2)
    num1 += diff
  }

  let operations = {
    "add": "+",
    "sub": "-",
    "mult": "*"
  }

  let evaluate = {
    "add" : num1 + num2,
    "sub" : num1 - num2,
    "mult" : num1 * num2
  }
  
  expressionContainer.append(`${num1} ${operations[operator]} ${num2}`)
  
  let solution = evaluate[operator]

  generateNumbers(solution)
}

function generateNumbers(solution){
  let numbersArray = []
  numbersArray.push(solution)

  let i = 0
  while (i < 4) {
    let num
    num = Math.floor(Math.random()*20)
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