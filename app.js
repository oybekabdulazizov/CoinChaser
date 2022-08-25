const pacman = document.querySelector("#pacman");
const coin = document.querySelector("#coin");
const gameArena = document.querySelector("#game-arena");
const pStyles = getComputedStyle(pacman);
const cStyles = getComputedStyle(coin);

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
})

const moveUp = () => {
    const currentTop = extractPosition(pStyles.top);
    console.log(`offsetHeight: ${gameArena.offsetHeight}`);
    if (currentTop > 100) {
        pacman.style.transform = "rotate(-90deg)";
        pacman.style.top = `${currentTop - 20}px`;
        console.log(`currentTop: ${currentTop}`)
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