function getHighScore(highscore) {
  if (localStorage.getItem('highscore')) {
    return localStorage.getItem('highscore');
  } else {
    return 0;
  }
}

function setHighScore(score) {
  if (localStorage.getItem('highscore')) {
    const currentHighScore = localStorage.getItem('highscore');
    if (score > currentHighScore) {
      localStorage.setItem('highscore', score.toString());
      console.log(localStorage.getItem('highscore'));
    }
  } else {
    localStorage.setItem('highscore', score.toString());
  }
}

export { getHighScore, setHighScore };