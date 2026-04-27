//get canvas
var canvas = document.getElementById("gameCanvas");
var draw_canvas = canvas.getContext("2d");

//player variables
var playerWidth = 40;
var playerHeight = 40;
var playerX = canvas.width / 2 - 20;
var playerY = canvas.height - 60;
var playerSpeed = 5;

//game varibles
var score = 0;
var misses = 0;
var maxMisses = 5;
var gameOver = false;

//array 
var bullets = [];
var enemies = [];

//key control
var moveLeft = false;
var moveRight = false;

//key press
document.addEventListener("keydown", function(event) {
	

    if (event.key == "a" || event.key == "A" || event.key == "ArrowLeft") {
        moveLeft = true;
    }

    if (event.key == "d" || event.key == "D" || event.key == "ArrowRight") {
        moveRight = true;
    }

    if (event.key == " ") {
        shootBullet();
    }
});

//key not pressed
document.addEventListener("keyup", function(event) {

    if (event.key == "a" || event.key == "A") {
        moveLeft = false;
    }

    if (event.key == "d" || event.key == "D") {
        moveRight = false;
    }
});

//shoot bullets
function shootBullet() {

    var bullet = {
        x: playerX + playerWidth / 2,
        y: playerY,
        width: 5,
        height: 10,
        speed: 7
    };
    bullets.push(bullet);
}

//spanw enemies
function spawnEnemy() {

    var enemy = {
        x: Math.random() * (canvas.width - 40),
        y: 0,
        width: 30,
        height: 30,
        speed: 5
    };

    enemies.push(enemy);
}

//spawn enemy every 1.3 seconds
setInterval(spawnEnemy, 1300);

//update game
function updateGame() {

    if (gameOver == true) {
        drawGameOver();
        return;
    }

    //player movement
    if (moveLeft == true && playerX > 0) {
        playerX = playerX - playerSpeed;
    }

    if (moveRight == true && playerX < canvas.width - playerWidth) {
        playerX = playerX + playerSpeed;
    }

    //bullet movement
    for (var i = 0; i < bullets.length; i++) {

        bullets[i].y = bullets[i].y - bullets[i].speed;

        //remove bullets that go off screen
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }

    //enemy movement
    for (var i = 0; i < enemies.length; i++) {

        enemies[i].y = enemies[i].y + enemies[i].speed;

        //check if enemy passes by
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            misses++;
            i--;

            if (misses >= maxMisses) {
                gameOver = true;
            }
        }
    }

    //collision
    checkCollisions();

    //draw game
    drawGame();
}

//collision detection
function checkCollisions() {

    //bullet hit enemy
    for (var i = 0; i < enemies.length; i++) {
        for (var j = 0; j < bullets.length; j++) {
            if (
                bullets[j].x < enemies[i].x + enemies[i].width &&
                bullets[j].x + bullets[j].width > enemies[i].x &&
                bullets[j].y < enemies[i].y + enemies[i].height &&
                bullets[j].y + bullets[j].height > enemies[i].y
            ) {
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                score++;
                i--;
                break;
            }
        }

        //player hit by enemy
        if (
            enemies[i] &&
            enemies[i].x < playerX + playerWidth &&
            enemies[i].x + enemies[i].width > playerX &&
            enemies[i].y < playerY + playerHeight &&
            enemies[i].y + enemies[i].height > playerY
        ) {
            gameOver = true;
        }
    }
}


//game loop
setInterval(updateGame, 20);