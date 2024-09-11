// Variables to store the score
let teamAScore = 0;
let teamBScore = 0;

// Update the scoreboard
function updateScoreboard() {
    document.getElementById('teamA-score').innerText = teamAScore;
    document.getElementById('teamB-score').innerText = teamBScore;
}

// Simulate scoring mechanism for Team A
function scoreForTeamA() {
    teamAScore++;
    updateScoreboard();
}

// Simulate scoring mechanism for Team B
function scoreForTeamB() {
    teamBScore++;
    updateScoreboard();
}

// Move players
document.addEventListener('keydown', function(event) {
    const teamAPlayer = document.getElementById('teamA-player1');
    const teamBPlayer = document.getElementById('teamB-player1');

    // Controls for Team A Player (W, A, S, D)
    if (event.key === 'w') teamAPlayer.style.top = (teamAPlayer.offsetTop - 10) + 'px';
    if (event.key === 's') teamAPlayer.style.top = (teamAPlayer.offsetTop + 10) + 'px';
    if (event.key === 'a') teamAPlayer.style.left = (teamAPlayer.offsetLeft - 10) + 'px';
    if (event.key === 'd') teamAPlayer.style.left = (teamAPlayer.offsetLeft + 10) + 'px';

    // Controls for Team B Player (Arrow Keys)
    if (event.key === 'ArrowUp') teamBPlayer.style.top = (teamBPlayer.offsetTop - 10) + 'px';
    if (event.key === 'ArrowDown') teamBPlayer.style.top = (teamBPlayer.offsetTop + 10) + 'px';
    if (event.key === 'ArrowLeft') teamBPlayer.style.left = (teamBPlayer.offsetLeft - 10) + 'px';
    if (event.key === 'ArrowRight') teamBPlayer.style.left = (teamBPlayer.offsetLeft + 10) + 'px';

    // Check for scoring
    if (teamAPlayer.offsetLeft <= 30 && Math.abs(teamAPlayer.offsetTop - 90) <= 60) {
        scoreForTeamA();
        resetPositions();
    }

    if (teamBPlayer.offsetLeft >= 570 && Math.abs(teamBPlayer.offsetTop - 90) <= 60) {
        scoreForTeamB();
        resetPositions();
    }
});

// Reset player positions after a goal
function resetPositions() {
    document.getElementById('teamA-player1').style.top = '135px';
    document.getElementById('teamA-player1').style.left = '100px';

    document.getElementById('teamB-player1').style.top = '135px';
    document.getElementById('teamB-player1').style.left = '500px';
}

// Initialize the game
updateScoreboard();
resetPositions();
