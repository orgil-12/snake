let headTop = 5;
let headLeft = 5;
let direction = "right";
let intervalId = null;

let tails = [
  { x: 2, y: 5 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
];

const config = {
  size: 20,
  width: 30,
  height: 30,
};

const boardEl = document.getElementById("board");
boardEl.style.width = config.width * config.size + "px";
boardEl.style.height = config.height * config.size + "px";

function goUp() {
  headTop = headTop - 1;
  if (headTop < 0) {
    headTop = config.height - 1;
  }
  render();
}

function goDown() {
  headTop = headTop + 1;
  if (headTop === config.height) {
    headTop = 0;
  }
  render();
}

function goRight() {
  headLeft = headLeft + 1;
  if (headLeft === config.width) {
    headLeft = 0;
  }
  render();
}

function goLeft() {
  headLeft = headLeft - 1;
  if (headLeft < 0) {
    headLeft = config.width - 1;
  }
  render();
}

function changeDirection(newDirection) {
  if (direction === "up" || direction === "down") {
    if (newDirection === "right" || newDirection === "left") {
      direction = newDirection;
    }
  } else if (direction === "left" || direction === "right") {
    if (newDirection === "up" || newDirection === "down") {
      direction = newDirection;
    }
  }
}

function gameStart() {
  if (!intervalId) {
    intervalId = setInterval(gameLoop, 300);
  }
  render();
}

function gamePause() {
  clearInterval(intervalId);
  intervalId = null;
}

function gameRestart() {
  headTop = 5;
  headLeft = 5;
  direction = "right";

  tails = [
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
  ];
  gameStart();
  gamePause();
}

function gameLoop() {
  tails.push({ x: headLeft, y: headTop });
  tails.shift();
  switch (direction) {
    case "up":
      goUp();
      break;
    case "down":
      goDown();
      break;
    case "right":
      goRight();
      break;
    case "left":
      goLeft();
      break;
  }
}

function listenKeys(event) {
  const key = event.key;
  switch (key) {
    case "ArrowUp":
      changeDirection("up");
      break;
    case "ArrowDown":
      changeDirection("down");
      break;
    case "ArrowRight":
      changeDirection("right");
      break;
    case "ArrowLeft":
      changeDirection("left");
      break;
  }
}

document.addEventListener("keydown", listenKeys);

function render() {
  let tailsHtml = "";

  for (let i = 0; i < tails.length; i++) {
    tailsHtml += `<div class ="snake" style="width: ${
      1 * config.size
    }px; height: ${1 * config.size}px; top: ${
      tails[i].y * config.size
    }px; left: ${tails[i].x * config.size}px"></div>`;
  }

  boardEl.innerHTML = tailsHtml;
}
