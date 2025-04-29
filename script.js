let boxData = {};
let currentBox = null;

async function startChallenge() {
    const boxId = document.getElementById('boxIdInput').value.trim();
    const res = await fetch('data.json');
    const data = await res.json();
    currentBox = data.boxes.find(box => box.id === boxId);

    if (!currentBox) {
        alert('Box not found!');
        return;
    }

    showScreen('guess-screen');
}

function submitGuess() {
    const userGuess = document.getElementById('guessInput').value.trim().toLowerCase();

    if (currentBox.acceptedAnswers.includes(userGuess)) {
        document.getElementById('itemImage').src = currentBox.itemImage;
        document.getElementById('itemDescription').innerText = currentBox.description;
        showScreen('success-screen');
    } else {
        document.getElementById('hint-container').classList.remove('hidden');
        document.getElementById('hintVideo').src = currentBox.hintVideo;
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
    document.getElementById(screenId).classList.add('active');
}
