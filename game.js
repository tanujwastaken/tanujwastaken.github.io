const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const UNIT_SIZE = 20;
const ROWS = canvas.height / UNIT_SIZE;
const COLS = canvas.width / UNIT_SIZE;

let snake = [
  { x: 10 * UNIT_SIZE, y: 10 * UNIT_SIZE }
];

let velocity = { x: UNIT_SIZE, y: 0 };

let food = spawnFood();
let running = true;
let score = 0;

// 🎮 INPUT (replaces KeyListener)
document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      if (velocity.y === 0) velocity = { x: 0, y: -UNIT_SIZE };
      break;
    case "ArrowDown":
      if (velocity.y === 0) velocity = { x: 0, y: UNIT_SIZE };
      break;
    case "ArrowLeft":
      if (velocity.x === 0) velocity = { x: -UNIT_SIZE, y: 0 };
      break;
    case "ArrowRight":
      if (velocity.x === 0) velocity = { x: UNIT_SIZE, y: 0 };
      break;
  }
});

// 🍎 FOOD
function spawnFood() {
  return {
    x: Math.floor(Math.random() * COLS) * UNIT_SIZE,
    y: Math.floor(Math.random() * ROWS) * UNIT_SIZE
  };
}

// 🔄 UPDATE (your game logic)
function update() {
  if (!running) return;

  const head = {
    x: snake[0].x + velocity.x,
    y: snake[0].y + velocity.y
  };

  snake.unshift(head);

  // 🍎 Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = spawnFood();
  } else {
    snake.pop();
  }

  // 💥 Wall collision
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    running = false;
  }

  // 💀 Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      running = false;
    }
  }
}

// 🎨 DRAW (replaces paintComponent)
function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Snake
  ctx.fillStyle = "lime";
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, UNIT_SIZE, UNIT_SIZE);
  });

  // Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, UNIT_SIZE, UNIT_SIZE);

  // Score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);

  if (!running) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", 180, 300);
  }
}

// 🔁 GAME LOOP (replaces Timer)
function gameLoop() {
  update();
  draw();
  setTimeout(() => requestAnimationFrame(gameLoop), 100); // controls speed
}

gameLoop();
