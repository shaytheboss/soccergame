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

// Preload game assets
function preload() {
    this.load.image('field', 'assets/soccer_field.png');  // Load soccer field image
    this.load.image('playerA', 'assets/player_red.png');  // Load player A (red team) image
    this.load.image('playerB', 'assets/player_blue.png'); // Load player B (blue team) image
    this.load.image('ball', 'assets/soccer_ball.png');    // Load soccer ball image
}

// Create game objects
function create() {
    // Add the soccer field
    this.add.image(400, 300, 'field');  // Position the field at the center

    // Add players and ball
    playerA = this.physics.add.sprite(100, 300, 'playerA');  // Player A
    playerB = this.physics.add.sprite(700, 300, 'playerB');  // Player B
    ball = this.physics.add.sprite(400, 300, 'ball');        // Soccer ball

    // Ensure ball stays within the field and bounces
    ball.setCollideWorldBounds(true);
    ball.setBounce(1);

    // Players stay within field bounds
    playerA.setCollideWorldBounds(true);
    playerB.setCollideWorldBounds(true);

    // Set up player input (arrow keys for Player A)
    cursors = this.input.keyboard.createCursorKeys();

    // Enable collision detection between the ball and players
    this.physics.add.collider(ball, playerA);
    this.physics.add.collider(ball, playerB);

    // Display score
    scoreText = this.add.text(16, 16, 'Score: 0 - 0', { fontSize: '32px', fill: '#fff' });
}

// Update function to handle player movements and game logic
function update() {
    // Player A controls (using arrow keys)
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

    // Check for scoring (basic goal detection logic)
    if (ball.x < 50) {  // If ball crosses the left side (Team A's goal)
        scoreB += 1;
        updateScore();
        resetBall();
    } else if (ball.x > 750) {  // If ball crosses the right side (Team B's goal)
        scoreA += 1;
        updateScore();
        resetBall();
    }
}

// Reset the ball to the center after scoring
function resetBall() {
    ball.setPosition(400, 300);  // Reset ball position to center
    ball.setVelocity(0, 0);      // Stop the ball movement
}

// Update the score display
function updateScore() {
    scoreText.setText('Score: ' + scoreA + ' - ' + scoreB);
}
