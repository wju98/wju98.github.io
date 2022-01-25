const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let arrowSize = 6;
let upPressed = downPressed = leftPressed = rightPressed = false;
let rounds = [4, 6, 7, 7, 7, 8, 8, 8, 10, 10];
let currRound = 0;
let numberOfArrows = rounds[currRound];
let arrows = generateRandomArrows(numberOfArrows);
let currArrow = 0;
let tryAgain = false;
let startTime;
let finalTime;
let gameStart = false;

function drawGame() {
    requestAnimationFrame(drawGame);
    clearScreen();
    inputs();
    calcRoundArrow();
    if (tryAgain) {
        drawTryAgainScreen();
        drawFinalTime();
    } else {
        drawArrows();
        drawRoundNumber(currRound + 1);
        if (gameStart)
            drawElapsedTime();
    }
}

function inputs() {
    if (upPressed && arrows[currArrow] == 0)
        currArrow++;
    else if (downPressed && arrows[currArrow] == 1)
        currArrow++;
    else if (leftPressed && arrows[currArrow] == 2)
        currArrow++;
    else if (rightPressed && arrows[currArrow] == 3)
        currArrow++;
    else if (upPressed || downPressed || leftPressed || rightPressed)
        currArrow = 0;
    upPressed = downPressed = leftPressed = rightPressed = false;
}

function drawArrows() {
    for (let i = currArrow; i < arrows.length; i++) {
        let xPos = canvas.width / 2 - (arrows.length / 2 - i - 0.5) * (15 * arrowSize);
        let yPos = canvas.height * 2 / 3;
        if (arrows[i] == 0)
            drawUpArrow(xPos, yPos);
        if (arrows[i] == 1)
            drawDownArrow(xPos, yPos);
        if (arrows[i] == 2)
            drawLeftArrow(xPos, yPos);
        if (arrows[i] == 3)
            drawRightArrow(xPos, yPos);
    }
}

function drawUpArrow(xPos, yPos) {
    ctx.fillStyle = "yellow";
    var path = new Path2D();
    path.moveTo(xPos + (5 * arrowSize), yPos - arrowSize);
    path.lineTo(xPos, yPos - (7 * arrowSize));
    path.lineTo(xPos - (5 * arrowSize), yPos - arrowSize);
    ctx.fill(path);
    ctx.fillRect(xPos - arrowSize, yPos - arrowSize, 2 * arrowSize, 7 * arrowSize);
}

function drawDownArrow(xPos, yPos) {
    ctx.fillStyle = "red";
    var path = new Path2D();
    path.moveTo(xPos + (5 * arrowSize), yPos + arrowSize);
    path.lineTo(xPos, yPos + (7 * arrowSize));
    path.lineTo(xPos - (5 * arrowSize), yPos + arrowSize);
    ctx.fill(path);
    ctx.fillRect(xPos - arrowSize, yPos - (6 * arrowSize), 2 * arrowSize, 7 * arrowSize);
}

function drawLeftArrow(xPos, yPos) {
    ctx.fillStyle = "lime";
    var path = new Path2D();
    path.moveTo(xPos - arrowSize, yPos + (5 * arrowSize));
    path.lineTo(xPos - (7 * arrowSize), yPos);
    path.lineTo(xPos - arrowSize, yPos - (5 * arrowSize));
    ctx.fill(path);
    ctx.fillRect(xPos - arrowSize, yPos - arrowSize, 7 * arrowSize, 2 * arrowSize);
}

function drawRightArrow(xPos, yPos) {
    ctx.fillStyle = "aqua";
    var path = new Path2D();
    path.moveTo(xPos + arrowSize, yPos + (5 * arrowSize));
    path.lineTo(xPos + (7 * arrowSize), yPos);
    path.lineTo(xPos + arrowSize, yPos - (5 * arrowSize));
    ctx.fill(path);
    ctx.fillRect(xPos - (6 * arrowSize), yPos - arrowSize, 7 * arrowSize, 2 * arrowSize);
}

function drawRoundNumber(roundNum) {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "Azure";
    ctx.fillText("Round " + roundNum, canvas.width / 2 - 50, canvas.height / 8);
}

function drawElapsedTime() {
    let elapsed = Number((parseFloat(new Date() - startTime) / 1000).toFixed(2));
    ctx.font = "25px Comic Sans MS";
    ctx.fillStyle = "Azure";
    ctx.fillText(elapsed + "", canvas.width / 2 - 15, canvas.height / 3);
}

function drawTryAgainScreen() {
    ctx.font = "60px Comic Sans MS";
    ctx.fillStyle = "Azure";
    ctx.fillText("Click Anywhere to Try Again", 110, canvas.height / 3);
}

function drawFinalTime() {
    ctx.font = "40px Comic Sans MS";
    ctx.fillStyle = "Azure";
    ctx.fillText(finalTime + " seconds", canvas.width / 2 - 120, canvas.height * 2 / 3);
}

function generateRandomArrows(num) {
    let arrows = [];
    for (let i = 0; i < num; i++)
        arrows.push(Math.floor(Math.random() * 4));
    return arrows;
}

function calcRoundArrow() {
    if (currArrow == arrows.length) {
        currRound++;
        if (currRound == rounds.length) {
            currRound = 0;
            tryAgain = true;
            gameStart = false;
            finalTime = Number((parseFloat(new Date() - startTime) / 1000).toFixed(2));
        }
        arrows = generateRandomArrows(rounds[currRound]);
        currArrow = 0;
    }
    if (!gameStart && currArrow == 1 && currRound == 0) {
        gameStart = true;
        startTime = new Date();
    }
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

document.body.addEventListener('keydown', keyDown);
canvas.addEventListener('click', onClick);

function keyDown(event) {
    if (event.keyCode == 38)
        upPressed = true;
    if (event.keyCode == 40)
        downPressed = true;
    if (event.keyCode == 37)
        leftPressed = true;
    if (event.keyCode == 39)
        rightPressed = true;
}

function onClick(event) {
    tryAgain = false;
}

drawGame();