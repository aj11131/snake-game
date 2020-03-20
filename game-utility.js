function setGamePerimeters(head, segment, area) {
  const width = window.innerWidth;
  const largeGameSize = 600;
  const smallGameSize = 312;
  const largeMoveDistance = 20;
  const smallMoveDistance = 13;
  const smallHeadSize = 13;

  if (width >= largeGameSize) {
    area.style.width = largeGameSize + 'px';
    area.style.height = largeGameSize + 'px';

    document.getElementById('arrow-container').style.width = largeGameSize + 'px';
    document.getElementById('score-container').style.width = largeGameSize + 'px';

    return {
      gameSize: largeGameSize,
      moveDistance: largeMoveDistance,
      segmentSize: 'segmentLarge',
      foodSize: 'large'
    }
  } else {
    head.style.width = smallHeadSize + 'px';
    head.style.height = smallHeadSize + 'px';

    area.style.width = smallGameSize + 'px';
    area.style.height = smallGameSize + 'px';

    document.getElementById('arrow-container').style.width = smallGameSize + 'px';
    document.getElementById('score-container').style.width = smallGameSize + 'px';

    return {
      gameSize: smallGameSize,
      moveDistance: smallMoveDistance,
      segmentSize: 'segmentSmall',
      foodSize: 'small'
    }
  }
}

function isMobileDevice() {
if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)) {
   return true;
 }
 return false;
};

function hideArrowKeys(element) {
  if (isMobileDevice()) {
    element.style.display = 'flex';
  }
}

export {setGamePerimeters, hideArrowKeys};