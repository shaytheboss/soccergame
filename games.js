// Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let playerA;
let playerB;
let ball;
let cursors;
let scoreA = 0;
let scoreB = 0;
let scoreText;

// Preload assets
function preload() {
    this.load.image('field', 'assets/soccer_field.png');  // Soccer field
    this.load.image('playerA', 'assets/player_red.png');  // Player A (Red)
    this.load.image('playerB', 'assets/player_blue.png'); // Player B (Blue)
    this.load.image('ball', 'assets/soccer_ball.png');    // Soccer ball
}

// Create the game objects
function create() {
    // Add the soccer field
    this.add.image(400, 300, 'field');

    // Add the players and ball
    playerA = this.physics.add.sprite(100, 300, 'playerA');
    playerB = this.physics.add.sprite(700, 300, 'playerB');
    ball = this.physics.add.sprite(400, 300, 'ball');

    // Ensure the ball stays within bounds and has bounce
    ball.setCollideWorldBounds(true);
    ball.setBounce(1);

    // Make the players stay within the field bounds
    playerA.setCollideWorldBounds(true);
    playerB.setCollideWorldBounds(true);

    // Set up player input (using arrow keys for Player A)
    cursors = this.input.keyboard.createCursorKeys();

    // Enable physics-based collision between ball and players
    this.physics.add.collider(ball, playerA);
    this.physics.add.collider(ball, playerB);

    // Display the score
    scoreText = this.add.text(16, 16, 'Score: 0 - 0', { fontSize: '32px', fill: '#fff' });
}

// Update function to handle player movements and game logic
function update() {
    // Player A controls (WASD keys)
    if (cursors.left.isDown) {
        playerA.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        playerA.setVelocityX(160);
    } else {
        playerA.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        playerA.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        playerA.setVelocityY(160);
    } else {
        playerA.setVelocityY(0);
    }

    // Player B controls (Arrow keys) - You can add controls for Player B if you want multiplayer

    // Check for scoring logic (simple goal detection)
    if (ball.x < 50) {  // If the ball crosses the left side (Team A goal)
        scoreB += 1;
        updateScore();
        resetBall();
    } else if (ball.x > 750) {  // If the ball crosses the right side (Team B goal)
        scoreA += 1;
        updateScore();
        resetBall();
    }
}

// Reset ball to the center of the field after a goal
function resetBall() {
    ball.setPosition(400, 300);  // Reset the ball to the center
    ball.setVelocity(0, 0);      // Stop the ball
}

// Update the score display
function updateScore() {
    scoreText.setText('Score: ' + scoreA + ' - ' + scoreB);
}
