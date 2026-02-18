const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const startMessage = document.getElementById('startMessage');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor;

// Set canvas size to full viewport width and height minus some padding
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    currentColor = getRandomColor();
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    startMessage.style.display = 'none';
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 5;
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// For touch devices
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
    const touch = e.touches[0];
    lastX = touch.offsetX;
    lastY = touch.offsetY;
    currentColor = getRandomColor();
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    startMessage.style.display = 'none';
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (isDrawing) {
        const touch = e.touches[0];
        ctx.lineTo(touch.offsetX, touch.offsetY);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 5;
        ctx.stroke();
        lastX = touch.offsetX;
        lastY = touch.offsetY;
    }
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});
