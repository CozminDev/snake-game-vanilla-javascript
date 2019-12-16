let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 }
];

let dx = 10;
let dy = 0;

let isMovingRight = true;
let isMovingLeft = false;
let isMovingUp = false;
let isMovingDown = false;

let food = {};

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

//Start
main();
document.addEventListener("keydown", e => changeDirection(e));

function main() {
  generateFood();
  let interval = setInterval(function onTick() {
    clearCanvas();
    drawFood();
    drawSnake();
    advanceSnake();
    if (didGameEnd()) {
      clearInterval(interval);
      let elem = document.getElementById("game-title");
      elem.innerHTML = "Game Over";
    }
  }, 100);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawFood() {
  ctx.fillStyle = "#FF0000";
  ctx.strokeStyle = "#000000";

  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.strokeRect(food.x, food.y, 10, 10);
}

function drawSnake() {
  snake.forEach(snakePart => drawSnakePart(snakePart));
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = "#90ee90";
  ctx.strokeStyle = "#000000";
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function advanceSnake() {
  checkCurrentDirection();
  let head = {};
  if (snake[0].x == canvas.width - 10 && isMovingRight) {
    head = { x: 0, y: snake[0].y };
  } else if (snake[0].x == 0 && isMovingLeft) {
    head = { x: canvas.width, y: snake[0].y };
  } else if (snake[0].y == canvas.height - 10 && isMovingUp) {
    head = { x: snake[0].x, y: 0 };
  } else if (snake[0].y == 0 && isMovingDown) {
    head = { x: snake[0].x, y: canvas.height };
  } else head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  const didEatFood = snake[0].x == food.x && snake[0].y == food.y;
  if (didEatFood) {
    generateFood();
  } else {
    snake.pop();
  }
}

function checkCurrentDirection() {
  isMovingRight = dx == 10;
  isMovingLeft = dx == -10;
  isMovingUp = dy == 10;
  isMovingDown = dy == -10;
}

function generateFood() {
  food = {
    x: randomTen(0, canvas.width - 10),
    y: randomTen(0, canvas.height - 10)
  };
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function didGameEnd() {
  for (let index = 4; index < snake.length; index++) {
    if (snake[0].x == snake[index].x && snake[0].y == snake[index].y)
      return true;
  }
  return false;
}

function changeDirection(e) {
  const keyCode = e.keyCode;
  const KEY_RIGHT = 39;
  const KEY_LEFT = 37;
  const KEY_UP = 38;
  const KEY_DOWN = 40;

  checkCurrentDirection();

  if (keyCode == KEY_RIGHT && (isMovingUp || isMovingDown)) {
    dx = 10;
    dy = 0;
  }

  if (keyCode == KEY_LEFT && (isMovingUp || isMovingDown)) {
    dx = -10;
    dy = 0;
  }

  if (keyCode == KEY_UP && (isMovingRight || isMovingLeft)) {
    dx = 0;
    dy = -10;
  }

  if (keyCode == KEY_DOWN && (isMovingRight || isMovingLeft)) {
    dx = 0;
    dy = 10;
  }
}