const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let path = generateSpiralPath(400, 300, 2.5, 1000, 2.5);
let pathBalls = [];
let shooterBall = null;
let nextBallColor = randomColor();
let score = 0;
let gameOver = false;

// Oyuncu
const shooter = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  angle: 0,
  radius: 10
};

function addBallToPath() {
  if (gameOver) return;
  if (pathBalls.length < path.length - 100) {
    pathBalls.unshift({ color: randomColor(), posIndex: 0 });
  }
}

function drawShooter() {
  ctx.save();
  ctx.translate(shooter.x, shooter.y);
  ctx.rotate(shooter.angle);
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(5, 10);
  ctx.lineTo(-5, 10);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Bir sonraki topu göster (şeffaf daire)
  ctx.beginPath();
  ctx.arc(shooter.x, shooter.y + 40, 12, 0, Math.PI * 2);
  ctx.fillStyle = nextBallColor;
  ctx.globalAlpha = 0.8;
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.strokeStyle = '#fff';
  ctx.stroke();
}

function drawShooterBall() {
  if (shooterBall) {
    ctx.beginPath();
    ctx.arc(shooterBall.x, shooterBall.y, shooter.radius, 0, Math.PI * 2);
    ctx.fillStyle = shooterBall.color;
    ctx.fill();
  }
}

function drawPathBalls() {
  pathBalls.forEach(ball => {
    const pos = path[ball.posIndex];
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
  });
}

function updateShooterBall() {
  if (!shooterBall) return;
  shooterBall.x += shooterBall.dx;
  shooterBall.y += shooterBall.dy;

  for (let i = 0; i < pathBalls.length; i++) {
    const pathPos = path[pathBalls[i].posIndex];
    if (isColliding({ x: pathPos.x, y: pathPos.y }, shooterBall)) {
      const newBall = {
        color: shooterBall.color,
        posIndex: pathBalls[i].posIndex
      };
      pathBalls.splice(i, 0, newBall);
      playSound('pop');
      const matches = checkForMatches(pathBalls);
      if (matches.length >= 3) {
        score += matches.length * 10;
        document.getElementById('score').innerText = `Skor: ${score}`;
        pathBalls = pathBalls.filter((_, idx) => !matches.includes(idx));
      }
      shooterBall = null;
      return;
    }
  }

  if (
    shooterBall.x < 0 ||
    shooterBall.x > canvas.width ||
    shooterBall.y < 0 ||
    shooterBall.y > canvas.height
  ) {
    shooterBall = null;
  }
}

function updatePathBalls() {
  pathBalls.forEach(ball => {
    if (ball.posIndex < path.length - 1) ball.posIndex++;
    else {
      gameOver = true;
      alert('Oyun Bitti! Skor: ' + score);
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPathBalls();
  drawShooter();
  drawShooterBall();
}

function update() {
  if (!gameOver) {
    updateShooterBall();
    updatePathBalls();
  }
}

function gameLoop() {
  draw();
  update();
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('mousemove', (e) => {
  const dx = e.offsetX - shooter.x;
  const dy = e.offsetY - shooter.y;
  shooter.angle = Math.atan2(dy, dx);
});

canvas.addEventListener('click', () => {
  if (!shooterBall && !gameOver) {
    const angle = shooter.angle;
    shooterBall = {
      x: shooter.x,
      y: shooter.y,
      dx: Math.cos(angle) * 8,
      dy: Math.sin(angle) * 8,
      color: nextBallColor
    };
    nextBallColor = randomColor();
    playSound('shoot');
  }
});

function restartGame() {
  score = 0;
  gameOver = false;
  pathBalls = [];
  shooterBall = null;
  nextBallColor = randomColor();
  document.getElementById('score').innerText = 'Skor: 0';
}

setInterval(addBallToPath, 1200);
gameLoop();
