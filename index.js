let headTop = 5;
let headLeft = 5;
let foodCounter = 1;
let direction = "right";
let nextDirection = "right";
let intervalId = null;
let foodTop = Math.ceil(Math.random() * 15) - 1;
let foodLeft = Math.ceil(Math.random() * 15) - 1;

let tails = [
  { x: 4, y: 5 },
];

const config = {
  size: 30,
  width: 15,
  height: 15
};

const boardEl = document.getElementById("board");
boardEl.style.width = config.width * config.size + "px";
boardEl.style.height = config.height * config.size + "px";

function goUp() {
  headTop = headTop - 1;
  if (headTop < 0) {
    headTop = config.height - 1;
  }
}

function goDown() {
  headTop = headTop + 1;
  if (headTop === config.height) {
    headTop = 0;
  }
}

function goRight() {
  headLeft = headLeft + 1;
  if (headLeft === config.width) {
    headLeft = 0;
  }
}

function goLeft() {
  headLeft = headLeft - 1;
  if (headLeft < 0) {
    headLeft = config.width - 1;
  }
}

function changeDirection(newDirection) {
  if (direction === "up" || direction === "down") {
    if (newDirection === "right" || newDirection === "left") {
      nextDirection = newDirection;
    }
  } else if (direction === "left" || direction === "right") {
    if (newDirection === "up" || newDirection === "down") {
      nextDirection = newDirection;
    }
  }
}

function gameStart() {
  if (!intervalId) {
    intervalId = setInterval(gameLoop, 150);
  }
}

function gamePause() {
  clearInterval(intervalId);
  intervalId = null;
}

function gameRestart() {
  foodCounter = 1;
  headTop = 5;
  headLeft = 5;
  direction = "right";
  nextDirection = "right";

  tails = [
    { x: 4, y: 5 },
  ];
  foodTop = Math.ceil(Math.random() * 15) - 1;
  foodLeft = Math.ceil(Math.random() * 15) - 1;
  render();
  gameStart();
  gamePause();
}

function gameLoop() {
  
  switch (nextDirection) {
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

  tails.push({ x: headLeft, y: headTop });
  tails.shift();

  for(let i = 0; i < tails.length - 1; i++){
    if( headLeft === tails[i].x && headTop === tails[i].y){
      alert("Game over");
      gameRestart();
      gamePause();
    }
  }

  direction = nextDirection;
  render();
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
  eatFood();
  eatCounter.innerHTML = foodCounter;
}

function eatFood() {
  const eatCounter = document.getElementById("eatCounter")
  let foodHtml = "";

  foodHtml = `<img class ="food" src="apple.svg" style="width: ${1 * config.size}px; height: ${
    1 * config.size
  }px; top: ${foodTop * config.size}px; left: ${
    foodLeft * config.size
  }px"></div>`;

  boardEl.innerHTML += foodHtml;

  console.log({ foodLeft, foodTop });

  if (headLeft === foodLeft && headTop === foodTop) {
    tails.push({ x: headLeft, y: headTop });
    foodTop = Math.ceil(Math.random() * 15) - 1;
    foodLeft = Math.ceil(Math.random() * 15) - 1;
    foodCounter++;
  }  
}
