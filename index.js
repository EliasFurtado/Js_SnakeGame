const board_border = 'black';
const board_background = "white";
const snake_col = 'black';


let snake = [  
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200},
];

let changing_direction = false
let dx = 10;
let dy = 0;
let food_x;
let food_y;
let score = 0;
let speed = 100;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


main();

genFood();

document.addEventListener("keydown", changeDirection);

function main() {

    if(hasGameEnded()) return;

    changing_direction = false;
    setTimeout(function onTick() { 
        clearCanvas(); 
        drawFood();
        moveSnake(); 
        drawSnake();
        main()
    }, speed);
}

function clearCanvas() {
    context.fillStyle = board_background;
    context.strokeStyle = board_border;
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.strokeRect(0, 0, canvas.width, canvas.height)
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawFood() {
    context.fillStyle = 'lightgreen';
    context.fillRect(food_x, food_y, 10, 10);
    context.strokeRect(food_x, food_y, 10, 10);
}

function drawSnakePart(snakePart) {
    context.fillStyle = snake_col;
    context.fillRect(snakePart.x, snakePart.y, 10, 10);
}

function hasGameEnded() {
    for(let i = 4; i< snake.length; i++) {
        const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if(hasCollided)
            return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function genFood() {
    food_x = randomFood(0, canvas.width - 10);
    food_y = randomFood(0, canvas.height - 10);
 
    snake.forEach(function hasSnakeEatenFood(part){
        const has_eaten = part.x == food_x && part.y == food_y;
        if(has_eaten) genFood();
    })
 }

function changeDirection(e) {
    const LEFT_KEY = 65;
    const RIGHT_KEY = 68;
    const UP_KEY = 87;
    const DOWN_KEY = 83;

    if(changing_direction) return;
    changing_direction = true;

    const keyPressed = e.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight)
     {    
          dx = -10;
          dy = 0;  
     }
 
     if (keyPressed === UP_KEY && !goingDown)
     {    
          dx = 0;
          dy = -10;
     }
 
     if (keyPressed === RIGHT_KEY && !goingLeft)
     {    
          dx = 10;
          dy = 0;
     }
 
     if (keyPressed === DOWN_KEY && !goingUp)
     {    
          dx = 0;
          dy = 10;
     }
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if(has_eaten_food){
        score += 10
        document.getElementById('score').innerHTML = `<h2>Score: ${score}</h2>`;
        speed -= 2
        genFood();
    }else {
        snake.pop();
    }
}



