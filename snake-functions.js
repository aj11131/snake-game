import { clearFood } from './food-functions.js';

function renderSegments(positions, segmentSize) {
  const head = document.getElementById('area');
  const segmentList = head.children;


  document.querySelectorAll(`.${segmentSize}`).forEach(segment => (
    segment.remove()
  ));
  positions.forEach((position, index) => {
    if(index !== 0){

      const segment = document.createElement('div');
      segment.setAttribute('class', segmentSize);
      segment.style.left = position[0].toString() + 'px';
      segment.style.top = position[1].toString() + 'px';
      head.appendChild(segment);
    }
  });
}

function addNewPosition(newPosition, positions) {
  positions.unshift(newPosition);
  positions.pop();
}

function checkForBodyCollision(position, positions) {
  if (positions.includes(position)) {
    return true;
  }
  return false;
}

function die(segmentSize){
  document.querySelectorAll(`.${segmentSize}`).forEach(segment => (
    segment.remove()
  ));
  clearFood();
}

export { renderSegments, addNewPosition, checkForBodyCollision, die };