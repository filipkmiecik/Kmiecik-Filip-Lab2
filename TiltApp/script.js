document.addEventListener("DOMContentLoaded", playGame);

function playGame() {
    document.querySelector('#playButton').addEventListener('click', (e) => {
        new Canvas()
    })
}
