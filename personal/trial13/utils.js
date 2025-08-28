// Spiral yol uretici
function generateSpiralPath(centerX, centerY, loops, points, spacing) {
  let path = [];
  for (let i = 0; i < points; i++) {
    let angle = (i / points) * (2 * Math.PI * loops);
    let radius = spacing * angle;
    let x = centerX + Math.cos(angle) * radius;
    let y = centerY + Math.sin(angle) * radius;
    path.push({ x, y });
  }
  return path;
}

// Ses oynatıcı
function playSound(name) {
  const sound = new Audio(`assets/${name}.mp3`);
  sound.currentTime = 0;
  sound.play();
}

// Çarpışma kontrolü
function isColliding(ball1, ball2, radius = 15) {
  const dx = ball1.x - ball2.x;
  const dy = ball1.y - ball2.y;
  return Math.sqrt(dx * dx + dy * dy) < radius * 2;
}

// Aynı renkten 3 veya daha fazla topu bulma
function checkForMatches(balls) {
  let matchedIndexes = [];
  for (let i = 0; i < balls.length - 2; i++) {
    if (
      balls[i].color === balls[i + 1].color &&
      balls[i].color === balls[i + 2].color
    ) {
      let j = i + 3;
      while (j < balls.length && balls[j].color === balls[i].color) j++;
      for (let k = i; k < j; k++) matchedIndexes.push(k);
      i = j - 1;
    }
  }
  return [...new Set(matchedIndexes)];
}

// Renk secici
function randomColor() {
  const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
  return colors[Math.floor(Math.random() * colors.length)];
}
