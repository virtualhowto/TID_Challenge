let boxData = {};
let currentBox = null;

// Load data once
async function loadBoxData() {
  const res = await fetch('data.json');
  const data = await res.json();
  boxData = data.boxes;
}

loadBoxData();

// Start manually
function startChallenge() {
  const boxId = document.getElementById('boxIdInput').value.trim();
  loadChallenge(boxId);
}

// Start from QR
function loadChallenge(boxId) {
  currentBox = boxData.find(box => box.id === boxId);

  if (!currentBox) {
    alert('Box not found!');
    return;
  }

  showScreen('guess-screen');
}

// Handle Guess
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

// Screen changer
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  document.getElementById(screenId).classList.remove('hidden');
  document.getElementById(screenId).classList.add('active');
}

// Setup QR Scanner
function setupQrScanner() {
  const qrScanner = new Html5Qrcode("qr-reader");

  qrScanner.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 }
    },
    qrCodeMessage => {
      qrScanner.stop();
      console.log(`QR Code detected: ${qrCodeMessage}`);
      loadChallenge(qrCodeMessage.trim());
    },
    errorMessage => {
      console.log(`QR Code no match: ${errorMessage}`);
    }
  ).catch(err => {
    console.log(`QR scanner failed: ${err}`);
  });
}

// Start QR scanner when page loads
document.addEventListener('DOMContentLoaded', setupQrScanner);
