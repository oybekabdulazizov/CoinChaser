const pacman = document.querySelector("#pacman");
const coin = document.querySelector("#coin");
const gameArena = document.querySelector("#game-arena");
const pStyles = getComputedStyle(pacman);
const cStyles = getComputedStyle(coin);
const score = document.querySelector("#score");
let scoreCounter = 0;

const isTouching = (a, b) => {
    const pDetails = a.getBoundingClientRect(),
        cDetails = b.getBoundingClientRect();
    return !(
        pDetails.top + pDetails.height < cDetails.top ||
        cDetails.top + cDetails.height < pDetails.top ||
        pDetails.left + pDetails.width < cDetails.left ||
        cDetails.left + cDetails.width < pDetails.left
    );
};

const extractPosition = position => parseInt(position.slice(0, -2));

const moveCoin = () => {
    const coinWidth = extractPosition(cStyles.width);
    const coinHeight = extractPosition(cStyles.height);
    const x = Math.floor(Math.random() * gameArena.offsetWidth);
    const y = Math.floor(Math.random() * gameArena.offsetHeight);
    const left = x + coinWidth <= gameArena.offsetWidth ? x : gameArena.offsetWidth - coinWidth;
    let top = y + coinHeight <= gameArena.offsetHeight ? y : gameArena.offsetHeight - coinHeight;
    top = y >= 100 ? y : y + 100;

    coin.style.left = `${left}px`;
    coin.style.top = `${top}px`;
}
moveCoin();

window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
        moveDown();
    } else if (e.key === "ArrowUp") {
        moveUp();
    } else if (e.key === "ArrowRight") {
        moveRight();
    } else if (e.key === "ArrowLeft") {
        moveLeft();
    }

    if (isTouching(pacman, coin)) {
        scoreCounter += 10;
        score.innerHTML = `Score: ${scoreCounter}`;
        moveCoin();
    }
})

const moveUp = () => {
    const currentTop = extractPosition(pStyles.top);
    if (currentTop > 100) {
        pacman.style.transform = "rotate(-90deg)";
        pacman.style.top = `${currentTop - 20}px`;
    }
}

const moveRight = () => {
    const currentLeft = extractPosition(pStyles.left);
    if (gameArena.offsetWidth > currentLeft + 100) {
        pacman.style.transform = "rotate(0deg)";
        pacman.style.left = `${currentLeft + 20}px`;
    }
}

const moveDown = () => {
    const currentTop = extractPosition(pStyles.top);
    if (gameArena.offsetHeight > currentTop) {
        pacman.style.transform = "rotate(90deg)";
        pacman.style.top = `${currentTop + 20}px`;
    }
}

const moveLeft = () => {
    const currentLeft = extractPosition(pStyles.left);
    if (currentLeft > 0) {
        pacman.style.transform = "rotate(180deg)";
        pacman.style.left = `${currentLeft - 20}px`;
    }
}