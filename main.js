let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 }
];

let dx = 10;
let dy = 0;

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

function main() {
  setInterval(function onTick() {
    clearCanvas();
    drawSnake();
    advanceSnake();
  }, 100);
}

function randomTen(min, max){
    return Math.round((Math.random() * (max-min) + min) / 10 ) * 10;
}

function drawSnake() {
  snake.forEach(snakePart => drawSnakePart(snakePart));
  console.log(randomTen(0, canvas.width));
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = "#90ee90";
  ctx.strokeStyle = "#000000";
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function advanceSnake() {
  let head = {};
  if (snake[0].x == canvas.width - 10 && snake[2].x == snake[0].x - 20) {
    head = { x: 0, y: snake[0].y };
  } 
  else if (snake[0].x == 0 && snake[2].x == snake[0].x + 20) {
    head = { x: canvas.width, y: snake[0].y };
  }
  else if (snake[0].y == canvas.height - 10 && snake[2].y == snake[0].y - 20) {
    head = { x: snake[0].x, y: 0 };
  }
  else if (snake[0].y == 0 && snake[2].y == snake[0].y + 20) {
    head = { x: snake[0].x, y: canvas.height };
  }
  else head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

function changeDirection(e) {
  const keyCode = e.keyCode;
  const KEY_RIGHT = 39;
  const KEY_LEFT = 37;
  const KEY_UP = 38;
  const KEY_DOWN = 40;

  const isMovingRight = dx == 10;
  const isMovingLeft = dx == -10;
  const isMovingUp = dy == 10;
  const isMovingDown = dy == -10;

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

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

main();

document.addEventListener("keydown", e => changeDirection(e));
