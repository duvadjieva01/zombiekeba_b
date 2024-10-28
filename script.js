document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const player = document.getElementById('player');
    const kebab = document.getElementById('kebab');
    const zombie = document.getElementById('zombie');
    const scoreElement = document.getElementById('score');
    let score = 0;

    // Set initial positions for kebab and zombie
    setPosition(kebab);
    setPosition(zombie);

    // Move player with arrow keys
    document.addEventListener('keydown', movePlayer);

    function movePlayer(e) {
        const step = 10;
        let left = player.offsetLeft;
        let top = player.offsetTop;

        switch(e.key) {
            case 'ArrowLeft':
                if (left > 0) player.style.left = left - step + 'px';
                break;
            case 'ArrowRight':
                if (left < gameArea.clientWidth - player.clientWidth) player.style.left = left + step + 'px';
                break;
            case 'ArrowUp':
                if (top > 0) player.style.top = top - step + 'px';
                break;
            case 'ArrowDown':
                if (top < gameArea.clientHeight - player.clientHeight) player.style.top = top + step + 'px';
                break;
        }

        checkCollision();
    }

    function setPosition(element) {
        const x = Math.floor(Math.random() * (gameArea.clientWidth - element.clientWidth));
        const y = Math.floor(Math.random() * (gameArea.clientHeight - element.clientHeight));
        element.style.left = x + 'px';
        element.style.top = y + 'px';
    }

    function checkCollision() {
        if (isColliding(player, kebab)) {
            score += 10;
            scoreElement.textContent = score;
            setPosition(kebab);
        }

        if (isColliding(player, zombie)) {
            alert('Game Over! Your score: ' + score);
            score = 0;
            scoreElement.textContent = score;
            setPosition(player);
            setPosition(kebab);
            setPosition(zombie);
        }
    }

    function isColliding(a, b) {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();

        return !(
            aRect.top + aRect.height < bRect.top ||
            aRect.top > bRect.top + bRect.height ||
            aRect.left + aRect.width < bRect.left ||
            aRect.left > bRect.left + bRect.width
        );
    }

    // Move the zombie randomly
    function moveZombie() {
        const step = 5;
        let zombieDirection = ['left', 'right', 'up', 'down'][Math.floor(Math.random() * 4)];

        let left = zombie.offsetLeft;
        let top = zombie.offsetTop;

        switch(zombieDirection) {
            case 'left':
                if (left > 0) zombie.style.left = left - step + 'px';
                break;
            case 'right':
                if (left < gameArea.clientWidth - zombie.clientWidth) zombie.style.left = left + step + 'px';
                break;
            case 'up':
                if (top > 0) zombie.style.top = top - step + 'px';
                break;
            case 'down':
                if (top < gameArea.clientHeight - zombie.clientHeight) zombie.style.top = top + step + 'px';
                break;
        }

        checkCollision();
    }

    setInterval(moveZombie, 500);
});
