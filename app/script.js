document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const snakeElement = document.getElementById('snake');
    const foodElement = document.getElementById('food');

    let snake = [{ x: 0, y: 0 }];
    let dx = 20;
    let dy = 0;
    let foodX = 0;
    let foodY = 0;

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        
        if (head.x === foodX && head.y === foodY) {
            // Snake eats the food
            placeFood();
        } else {
            // Remove the tail segment
            snake.pop();
        }

        updateSnake();
        checkCollision();
    }

    function updateSnake() {
        // Update the position of each snake segment
        snake.forEach((segment, index) => {
            const element = index === 0 ? snakeElement : createSegmentElement();
            element.style.left = segment.x + 'px';
            element.style.top = segment.y + 'px';
            if (index !== 0 && !element.parentNode) {
                gameArea.appendChild(element);
            }
        });
    }

    function createSegmentElement() {
        const segment = document.createElement('div');
        segment.className = 'snake-segment';
        return segment;
    }

    function placeFood() {
        foodX = Math.floor(Math.random() * 20) * 20;
        foodY = Math.floor(Math.random() * 20) * 20;
        foodElement.style.left = foodX + 'px';
        foodElement.style.top = foodY + 'px';
    }

    function checkCollision() {
        // Check if snake hits walls or itself
        const head = snake[0];
        if (head.x < 0 || head.y < 0 || head.x >= 400 || head.y >= 400 || hitSelf()) {
            gameOver();
        }
    }

    function hitSelf() {
        // Check if snake head collides with its body
        const head = snake[0];
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    function gameOver() {
        alert('Game Over!');
        window.location.reload();
    }

    placeFood();
    setInterval(moveSnake, 200);

    document.addEventListener('keydown', (e) => {
        // Adjust snake direction based on arrow keys
        if ((e.key === 'ArrowUp' || e.key === 'w') && dy === 0) {
            dx = 0;
            dy = -20;
        } else if ((e.key === 'ArrowDown' || e.key === 's') && dy === 0) {
            dx = 0;
            dy = 20;
        } else if ((e.key === 'ArrowLeft' || e.key === 'a') && dx === 0) {
            dx = -20;
            dy = 0;
        } else if ((e.key === 'ArrowRight' || e.key === 'd') && dx === 0) {
            dx = 20;
            dy = 0;
        }
    });
});
