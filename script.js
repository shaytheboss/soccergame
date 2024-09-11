// Variables to store the score
let teamAScore = 0;
let teamBScore = 0;

// Player movement speed
const speed = 10;

// Ball movement
let ballDirectionX = 1;
let ballDirectionY = 1;
const ballSpeed = 2;

// Elements
const teamAPlayer = document.getElementById('teamA-player1');
const teamBPlayer = document.getElementById('teamB-player1');
const ball = document.getElementById('ball');

// Update the scoreboard
function updateScoreboard() {
    document.getElementById('teamA-score').innerText = teamAScore;
    document.getElementById('teamB-score').innerText = teamBScore;
}

// Prevent default arrow key scrolling
window.addEventListener('keydown', function(e) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) > -1) {
        e.preventDefault();
    }
});

// Move players
document.addEventListener('keydown', function(event) {
    const field = document.querySelector('.field');

    // Controls for Team A Player (W, A, S, D)
    if (event.key === 'w' && teamAPlayer.offsetTop > 0) {
        teamAPlayer.style.top = (teamAPlayer.offsetTop - speed) + 'px';
    }
    if (event.key === 's' && teamAPlayer.offsetTop < field.offsetHeight - teamAPlayer.offsetHeight) {
        teamAPlayer.style.top = (teamAPlayer.offsetTop + speed) + 'px';
    }
    if (event.key === 'a' && teamAPlayer.offsetLeft > 0) {
        teamAPlayer.style.left = (teamAPlayer.offsetLeft - speed) + 'px';
    }
    if (event.key === 'd' && teamAPlayer.offsetLeft < field.offsetWidth - teamAPlayer.offsetWidth) {
        teamAPlayer.style.left = (teamAPlayer.offsetLeft + speed) + 'px';
    }

    // Controls for Team B Player (Arrow Keys)
    if (event.key === 'ArrowUp' && teamBPlayer.offsetTop > 0) {
        teamBPlayer.style.top = (teamBPlayer.offsetTop - speed) + 'px';
    }
    if (event.key === 'ArrowDown' && teamBPlayer.offsetTop < field.offsetHeight - teamBPlayer.offsetHeight) {
        teamBPlayer.style.top = (teamBPlayer.offsetTop + speed) + 'px';
    }
    if (event.key === 'ArrowLeft' && teamBPlayer.offsetLeft > 0) {
        teamBPlayer.style.left = (teamBPlayer.offsetLeft - speed) + 'px';
    }
    if (event.key === 'ArrowRight' && teamBPlayer.offsetLeft < field.offsetWidth - teamBPlayer.offsetWidth) {
        teamBPlayer.style.left = (teamBPlayer.offsetLeft + speed) + 'px';
    }
});

// Ball movement
function moveBall() {
    const ballRect = ball.getBoundingClientRect();
    const fieldRect = document.querySelector('.field').getBoundingClientRect();

    // Bounce the ball on field borders
    if (ballRect.left <= fieldRect.left || ballRect.right >= fieldRect.right) {
        ballDirectionX *= -1;
    }
    if (ballRect.top <= fieldRect.top || ballRect.bottom >= fieldRect.bottom) {
        ballDirectionY *= -1;
    }

    // Move ball
    ball.style.left = (ball.offsetLeft + ballDirectionX * ballSpeed) + 'px';
    ball.style.top = (ball.offsetTop + ballDirectionY * ballSpeed) + 'px';

    requestAnimationFrame(moveBall);
}

// Initialize the game
function initGame() {
    updateScoreboard();
    moveBall();
}

initGame();
