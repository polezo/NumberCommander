document.addEventListener("DOMContentLoaded", () => {

  let additionBtn = document.querySelector("#addition")
  additionBtn.addEventListener('click', () => {
    generateExpression()
  })

  let subtractionBtn = document.querySelector("#subtraction")
  subtractionBtn.addEventListener("click", () => {
    console.log("hi from subtraction")
  })

  let multiplicationBtn = document.querySelector("#multiplication")
  multiplicationBtn.addEventListener("click", () => {
    console.log("hi from multiplication")
  })
  // generateExpression()
});

function generateExpression(operator){
  let expressionContainer = document.querySelector("#expression")
  expressionContainer.innerText = ""

  let num1 = Math.floor(Math.random()*10)
  let num2 = Math.floor(Math.random()*10)

  expressionContainer.append(`${num1} + ${num2}`)

  let solution = num1 + num2

  generateNumbers(solution)
  // renderSolutionCards(solution)
  console.log(solution)
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