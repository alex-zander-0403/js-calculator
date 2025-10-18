// Переменные для хранения первого, второго числа, флага ожидания второго числа и текущего оператора
let firstNumber = "";
let secondNumber = "";
let waitingForSecondNumber = false;
let currentOperator = "";

const display = document.getElementById("display"); // Получаем элемент дисплея по его ID
const numbers = document.querySelectorAll(".number"); // Получаем все элементы с классом "number" (кнопки с цифрами)
const operators = document.querySelectorAll(".operator"); // Получаем все элементы с классом "operator" (кнопки с операторами)
const equalOperator = document.getElementById("equal"); // Получаем элемент кнопки "=" по его ID
const clearButton = document.querySelector(".clear"); // Получаем элемент кнопки "C" (очистка) по его классу

// =============================================

// 1 - Добавляем обработчик события "click" на каждую кнопку с цифрой
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    appendNumber(number.innerText);
  });
});

// 2 - Функция для добавления цифры на дисплей
function appendNumber(number) {
  if (waitingForSecondNumber) {
    display.value = number; //
    waitingForSecondNumber = false;
    secondNumber = number;
    // console.log("firstNumber ---1", firstNumber);
    // console.log("secondNumber ---1", secondNumber);
  } else {
    display.value += number;
    secondNumber += number;
    // console.log("firstNumber ---2", firstNumber);
    // console.log("secondNumber ---2", secondNumber);
  }
}

// =============================================

// 3 - Добавляем обработчик события "click" на каждую кнопку с оператором
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    waitingForSecondNumber = true;
    setOperator(operator.innerText);
  });
});

// 4 - Функция для установки текущего оператора
function setOperator(operator) {
  if (firstNumber === "") {
    firstNumber = display.value;
  }

  currentOperator = operator;
}

// =============================================

// 5 - Добавляем обработчик события "click" на кнопку "="
equalOperator.addEventListener("click", () => {
  if (currentOperator && secondNumber) {
    calculate();
  }
});

// 6 - Функция для выполнения вычислений
function calculate() {
  let result;
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);

  //   console.log("firstNumber ---", firstNumber);
  //   console.log("num1 -----", num1);
  //   console.log("operator", currentOperator);
  //   console.log("secondNumber ---", secondNumber);
  //   console.log("num2 -----", num2);

  // Выполняем вычисление в зависимости от текущего оператора
  switch (currentOperator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      // Проверяем, что второе число не равно нулю, чтобы избежать деления на ноль
      if (num2 !== 0) {
        result = num1 / num2;
      } else {
        result = "Ошибка: деление на ноль";
      }
      break;
  }

  display.value = result;
  firstNumber = result.toString();
  secondNumber = "";
  currentOperator = "";
}

// =============================================

// 7 - Добавляем обработчик события "click" на кнопку "C" (очистка)
clearButton.addEventListener("click", () => {
  clearDisplay();
});

// 8 - Функция для очистки дисплея и всех переменных
function clearDisplay() {
  display.value = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  waitingForSecondNumber = false;
}
