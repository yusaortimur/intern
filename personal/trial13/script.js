const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
let balls = [];
let shooterBall = null;

// Dairesel yol
let path = [];
for (let i = 0; i < 400; i++) {
  path.push({ x: 100 + i, y: 300 + 50 * Math.sin(i / 30) });
}

// Oyuna top ekle
function addBallToPath() {
  if (balls.length < 20) {
    balls.push({ color: colors[Math.floor(Math.random() * colors.length)], pos: 0 });
  }
}

function drawBalls() {
  balls.forEach(ball => {
    const { x, y } = path[ball.pos];
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
  });
}

// Oyuncunun topu
function drawShooterBall() {
  if (shooterBall) {
    ctx.beginPath();
    ctx.arc(shooterBall.x, shooterBall.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = shooterBall.color;
    ctx.fill();
  }
}

function updateShooterBall() {
  if (shooterBall) {
    shooterBall.y -= 5;
    // Çarpışma kontrolü (basit)
    balls.forEach((ball, i) => {
      const { x, y } = path[ball.pos];
      const dx = shooterBall.x - x;
      const dy = shooterBall.y - y;
      if (Math.sqrt(dx * dx + dy * dy) < 20) {
        // Aynı renk mi?
        if (ball.color === shooterBall.color) {
          balls.splice(i, 1); // Topu yok et
        }
        shooterBall = null;
      }
    });

    if (shooterBall && shooterBall.y < 0) {
      shooterBall = null;
    }
  }
}

// Oyun döngüsü
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Topları ilerlet
  balls.forEach(ball => {
    if (ball.pos < path.length - 1) ball.pos += 1;
  });

  drawBalls();
  drawShooterBall();
  updateShooterBall();

  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (e) => {
  if (!shooterBall) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    shooterBall = {
      x: x,
      y: canvas.height - 20,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }
});

// Başlat
setInterval(addBallToPath, 1500); // Her 1.5 sn'de yeni top ekle
gameLoop();

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
function checkForMatches(balls) {
  let matched = [];
  for (let i = 0; i < balls.length - 2; i++) {
    if (
      balls[i].color === balls[i + 1].color &&
      balls[i].color === balls[i + 2].color
    ) {
      matched.push(i, i + 1, i + 2);
    }
  }
  return [...new Set(matched)];
}
const shootSound = new Audio('assets/shoot.mp3');
const popSound = new Audio('assets/pop.mp3');

function playShoot() {
  shootSound.currentTime = 0;
  shootSound.play();
}

function playPop() {
  popSound.currentTime = 0;
  popSound.play();
}
