// return an empty location for the snake food to spawn
function spawnFoodLocator(tileArr, currentLocations) {
  const emptyTilesArr = getEmptyTiles(tileArr, currentLocations);
  const emptyTiles = emptyTilesArr.length;

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const randomTile = getRandomInt(emptyTiles);

  return emptyTilesArr[randomTile];
}

function getEmptyTiles(tileArr, currentLocations) {
  const currentLocationsStr = currentLocations.map(element => JSON.stringify(element));
  const emptyLocationsArr = tileArr.filter(element => {
    return !currentLocationsStr.includes(element);
  });
  return emptyLocationsArr.map(element => JSON.parse(element));
}

function spawnFood(parent, location, foodSize) {
  const food = document.createElement("div");
  food.setAttribute("id", "food");
  food.style.left = location[0].toString() + 'px';
  food.style.top = location[1].toString() + 'px';
  if (foodSize === 'small') {
    food.style.width = '13px';
    food.style.height = '13px';
  }
  parent.appendChild(food);
}

function clearFood() {
  document.getElementById('food').remove();
}

function eatFood(id) {
  document.getElementById(id).remove();
}

function checkForFoodCollision(foodLocationIndex, headPositionIndex) {
  if (foodLocationIndex === headPositionIndex) {
    eatFood('food');
    return true;
  } else {
    return false;
  }
}

export { spawnFoodLocator, getEmptyTiles, spawnFood, clearFood, eatFood, checkForFoodCollision };