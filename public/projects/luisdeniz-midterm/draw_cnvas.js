//draw game
function drawGame() {

    draw_canvas.clearRect(0, 0, canvas.width, canvas.height);

    //player
    draw_canvas.fillStyle = "cyan";
    draw_canvas.fillRect(playerX, playerY, playerWidth, playerHeight);

    //bullet
    draw_canvas.fillStyle = "yellow";
    for (var i = 0; i < bullets.length; i++) {
        draw_canvas.fillRect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
    }

    //enemy
    draw_canvas.fillStyle = "red";
    for (var i = 0; i < enemies.length; i++) {
        draw_canvas.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
    }

    //score and misses
    draw_canvas.fillStyle = "white";
    draw_canvas.font = "18px Arial";
    draw_canvas.fillText("Score: " + score, 10, 20);
    draw_canvas.fillText("Misses: " + misses + " / " + maxMisses, 10, 40);
}

//game over
function drawGameOver() {

    draw_canvas.fillStyle = "white";
    draw_canvas.font = "40px Arial";
    draw_canvas.textAlign = "center";
    draw_canvas.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

    draw_canvas.font = "20px Arial";
    draw_canvas.fillText("Final Score: " + score, canvas.width / 2, canvas.height / 2 + 40);
}