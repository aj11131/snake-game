import { spawnFoodLocator, getEmptyTiles, spawnFood, clearFood, eatFood, checkForFoodCollision } from './food-functions.js';
import { getHighScore, setHighScore } from './score-utility.js';
import { renderSegments, addNewPosition, checkForBodyCollision, die } from './snake-functions.js';;
import { tileGenerator } from './tileGenerator.js';
import { setGamePerimeters, hideArrowKeys } from './game-utility.js';


const head = document.getElementById('head');
const area = document.getElementById('area');
const segment = document.querySelectorAll('.segment');
const startButton = document.getElementById('start');
const gameStartUI = document.getElementById('game-start');
const gameOverUI = document.getElementById('game-over');
const playAgainButton = document.getElementById('again');
const scoreDisplay = document.getElementById('score');
const upArrow = document.getElementById('arrow-up');
const leftArrow = document.getElementById('arrow-left');
const downArrow = document.getElementById('arrow-down');
const rightArrow = document.getElementById('arrow-right');
const highScoreDisplay = document.getElementById('high-score');
const arrowContainer = document.getElementById('arrow-container');
const gamePerimeters = setGamePerimeters(head, segment, area);
const { gameSize, moveDistance, segmentSize, foodSize } = gamePerimeters;
const tiles = tileGenerator(gameSize, moveDistance);
const totalTiles = tiles.length;
//Position from left top corner in px [left, top]
let currentPositionCords;
let foodLocation;
let currentDirection;
let interval;
let score = 0;
let highScore = getHighScore();

hideArrowKeys(arrowContainer);

document.addEventListener('keydown', onArrowKeyPress);
startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', playAgain);
upArrow.addEventListener('touchstart', () => { onArrowClick(38) });
leftArrow.addEventListener('touchstart', () => { onArrowClick(37) });
downArrow.addEventListener('touchstart', () => { onArrowClick(40) });
rightArrow.addEventListener('touchstart', () => { onArrowClick(39) });
upArrow.addEventListener('click', () => { onArrowClick(38) });
leftArrow.addEventListener('click', () => { onArrowClick(37) });
downArrow.addEventListener('click', () => { onArrowClick(40) });
rightArrow.addEventListener('click', () => { onArrowClick(39) });


scoreDisplay.innerText = score;
highScoreDisplay.innerText = highScore;


// 37 is left arrow, 38 is top, 39 is right, 40 is bottom
const movementObj = {
  '37': {
    direction: 'left',
    distance: -moveDistance
  },
  '38': {
    direction: 'top',
    distance: -moveDistance
  },
  '39': {
    direction: 'left',
    distance: moveDistance
  },
  '40': {
    direction: 'top',
    distance: moveDistance
  }
}

function onArrowKeyPress(e) {
  if (e.which === 37 && currentDirection === 39) {
    currentDirection = 39;
    return;
  } else if (e.which === 38 && currentDirection === 40) {
    currentDirection = 40;
    return;
  } else if (e.which === 39 && currentDirection === 37) {
    currentDirection = 37;
    return;
  } else if (e.which === 40 && currentDirection === 38) {
    currentDirection = 38;
    return;
  }
  e.preventDefault();
  currentDirection = e.which;
}

function onArrowClick(direction) {
  if (direction === 37 && currentDirection === 39) {
    currentDirection = 39;
    return;
  } else if (direction === 38 && currentDirection === 40) {
    currentDirection = 40;
    return;
  } else if (direction === 39 && currentDirection === 37) {
    currentDirection = 37;
    return;
  } else if (direction === 40 && currentDirection === 38) {
    currentDirection = 38;
    return;
  }
  currentDirection = direction;
}

function move(currentDirection) {
  const moveInstruction = movementObj[currentDirection];
  const currentPosition = head.style[moveInstruction.direction].replace('px', '');
  const currentPositionInt = parseInt(currentPosition, 10);
  const newPositionInt = currentPositionInt + moveInstruction.distance;
  let newPositionCoord;


  if (newPositionInt === gameSize || newPositionInt === -moveDistance) {
    die(segmentSize);
    gameOver();
    return;
  } else {
    const growSegmentPosition = currentPositionCords[currentPositionCords.length - 1];
      
    if (moveInstruction.direction === 'left') {
      newPositionCoord = [newPositionInt, currentPositionCords[0][1]];
    } else if (moveInstruction.direction === 'top') {
      newPositionCoord = [currentPositionCords[0][0], newPositionInt];
    }

    if (checkForBodyCollision(JSON.stringify(newPositionCoord), JSON.stringify(currentPositionCords))) {
      die(segmentSize);
      gameOver();
      return;
    }

    addNewPosition(newPositionCoord, currentPositionCords);

    if (checkForFoodCollision (tiles.indexOf(JSON.stringify(foodLocation)), tiles.indexOf(JSON.stringify(currentPositionCords[0])))) {
      foodLocation = spawnFoodLocator(tiles, currentPositionCords);
      spawnFood(area, foodLocation, foodSize);
      currentPositionCords.push(growSegmentPosition);
      score++;
      scoreDisplay.innerText = score;
    };

    head.style[moveInstruction.direction] = `${newPositionInt}px`;
    renderSegments(currentPositionCords, segmentSize);
  }
}

function startGame() {
  head.style.display = 'block';
  head.style.left = 0;
  head.style.top = 0;
  score = 0;
  highScore = getHighScore();
  highScoreDisplay.innerText = highScore;
  currentDirection = '40';
  currentPositionCords = [[0, 0]];
  foodLocation = spawnFoodLocator(tiles, currentPositionCords);
  spawnFood(area, foodLocation, foodSize);
  interval = setInterval(() => {
    move(currentDirection);
  }, 150);
  startButton.style.display = "none";
  gameStartUI.style.display = "none";
  scoreDisplay.innerText = score;
}

function gameOver () {
  setHighScore(score);
  clearInterval(interval);
  gameOverUI.style.display = "flex";
}

function playAgain() {
  gameOverUI.style.display = "none";
  startGame();
}