// Smooth Scroll to Memories
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
  document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
});

// Reveal Memory Cards on Scroll
const cards = document.querySelectorAll('.memory-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
cards.forEach(card => observer.observe(card));

// Typing Effect for Birthday Message
const typingText = document.getElementById('typing-text');
const message = "Wishing you a day filled with love, laughter, and joy! 🎉🎂";
let idx = 0;

function typeWriter() {
  if (idx < message.length) {
    typingText.innerHTML += message.charAt(idx);
    idx++;
    setTimeout(typeWriter, 100);
  }
}

// Start typing when message section is in view
const messageObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typeWriter();
      messageObserver.disconnect(); // Run only once
    }
  });
});
messageObserver.observe(typingText);

// Candle Wish Effect
function makeWish() {
  const wishMessages = [
    "Your dreams will come true! 🌟",
    "Happiness is on the way! 🎁",
    "This year will be unforgettable! 💖",
    "Adventure awaits you! ✈️",
    "You’re loved more than you know! 💕"
  ];
  const randomWish = wishMessages[Math.floor(Math.random() * wishMessages.length)];
  document.getElementById('wish-message').innerText = randomWish;
}

// Confetti Canvas Animation
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiPieces = [];

for (let i = 0; i < 150; i++) {
  confettiPieces.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    size: Math.random() * 5 + 2,
    speedY: Math.random() * 3 + 1,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  moveConfetti();
}

function moveConfetti() {
  confettiPieces.forEach(p => {
    p.y += p.speedY;
    if (p.y > confettiCanvas.height) {
      p.y = 0;
      p.x = Math.random() * confettiCanvas.width;
    }
  });
}

setInterval(drawConfetti, 30);

// Fireworks Animation (Canvas)
const fireworksCanvas = document.getElementById('fireworks-canvas');
const fctx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

let fireworks = [];

function createFirework() {
  const x = Math.random() * fireworksCanvas.width;
  const y = fireworksCanvas.height;
  const targetY = Math.random() * (fireworksCanvas.height / 2);
  fireworks.push({ x, y, targetY, size: 3, speedY: Math.random() * 4 + 4 });
}

function updateFireworks() {
  fctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  fireworks.forEach((fw, index) => {
    fw.y -= fw.speedY;
    fctx.beginPath();
    fctx.arc(fw.x, fw.y, fw.size, 0, Math.PI * 2);
    fctx.fillStyle = 'white';
    fctx.fill();

    // Firework explosion
    if (fw.y <= fw.targetY) {
      for (let i = 0; i < 20; i++) {
        fireworks.push({
          x: fw.x,
          y: fw.y,
          size: 2,
          speedX: Math.random() * 6 - 3,
          speedY: Math.random() * 6 - 3,
          color: `hsl(${Math.random() * 360}, 100%, 70%)`,
          exploded: true
        });
      }
      fireworks.splice(index, 1);
    }

    // Move exploded particles
    if (fw.exploded) {
      fw.x += fw.speedX;
      fw.y += fw.speedY;
      fw.size *= 0.95;
      fctx.beginPath();
      fctx.arc(fw.x, fw.y, fw.size, 0, Math.PI * 2);
      fctx.fillStyle = fw.color;
      fctx.fill();
      if (fw.size < 0.5) {
        fireworks.splice(index, 1);
      }
    }
  });
}

setInterval(createFirework, 800);
setInterval(updateFireworks, 30);

// Handle window resize
window.addEventListener('resize', () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
});

window.addEventListener('load', () => {
    Swal.fire({
        title: 'Do you want to play music in the background?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
            animationTimeline();
        } else {
            animationTimeline();
        }
    });
});