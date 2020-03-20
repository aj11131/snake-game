// Takes the game square size in px and the movement distance in px

export function tileGenerator (gameSize, moveDistance) {
  if (gameSize % moveDistance !== 0) {
    throw Error('game size must be perfectly divisible by move distance')
    return;
  }

  // Get the number of columns an rows
  const totalColumns = gameSize / moveDistance;
  const totalRows = gameSize / moveDistance;
  const totalTiles = totalColumns * totalRows;
  
  // Nested for loop to generate an array containing all possible positions for tiles
  const tileArr = [];
  let tileCounter = 0;

  for (let column = 0; column < totalColumns * moveDistance; column += moveDistance) {
    for (let row = 0; row < totalRows * moveDistance; row += moveDistance) {
      tileArr[tileCounter] = JSON.stringify([column, row]);
      tileCounter++;
    }
  }
  return tileArr;
}