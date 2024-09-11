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

function preload() {
    this.load.image('field', 'assets/field.png');
    this.load.image('playerA', 'assets/playerA.png');
    this.load.image('playerB', 'assets/playerB.png');
    this.load.image('ball', 'assets/ball.png');
}

function create() {
    this.add.image(400, 300, 'field');
    
    playerA = this.physics.add.sprite(100, 300, 'playerA');
    playerB = this.physics.add.sprite(700, 300, 'playerB');
    ball = this.physics.add.sprite(400, 300, 'ball');
    
    ball.setCollideWorldBounds(true);
    ball.setBounce(1);
    
    playerA.setCollideWorldBounds(true);
    playerB.setCollideWorldBounds(true);
    
    cursors = this.input.keyboard.createCursorKeys();
    
    this.physics.add.collider(ball, playerA);
    this.physics.add.collider(ball, playerB);
    
    scoreText = this.add.text(16, 16, 'Score: 0 - 0', { fontSize: '32px', fill: '#fff' });
}

function update() {
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
    
    // Add more controls for playerB and collision detection for scoring
}
