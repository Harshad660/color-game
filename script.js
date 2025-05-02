let numSquares = 6;
let colors = [];
let pickedColor;
let squares = [];
const container = document.getElementById("container");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const h1 = document.querySelector("h1");
const resetButton = document.getElementById("reset");
const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");
const toggleBtn = document.getElementById("toggleMode");
let isDark = true;

resetButton.addEventListener("click", reset);
easyBtn.addEventListener("click", function () {
  easyBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  numSquares = 3;
  reset();
});
hardBtn.addEventListener("click", function () {
  hardBtn.classList.add("selected");
  easyBtn.classList.remove("selected");
  numSquares = 6;
  reset();
});
toggleBtn.addEventListener("click", () => {
  isDark = !isDark;
  document.body.className = isDark ? "dark-mode" : "light-mode";
  toggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
});

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor.toUpperCase();
  resetButton.textContent = "🎨 New Colors";
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "steelblue";
  setupSquares();
}

function setupSquares() {
  container.innerHTML = '';
  squares = [];

  for (let i = 0; i < numSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = colors[i];

    square.addEventListener("click", function () {
      const clickedColor = this.style.backgroundColor;
      messageDisplay.classList.remove("pop");
      void messageDisplay.offsetWidth;

      if (clickedColor === pickedColor) {
        const hexColor = rgbToHex(pickedColor);
        messageDisplay.textContent = `🎉 Correct! Hex Code: ${hexColor}`;
        messageDisplay.classList.add("pop");
        changeColors(pickedColor);
        h1.style.backgroundColor = pickedColor;
        resetButton.textContent = "🔁 Play Again?";
        setTimeout(reset, 3000);
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "❌ Try Again";
        messageDisplay.classList.add("pop");
      }
    });

    container.appendChild(square);
    squares.push(square);
  }
}

function changeColors(color) {
  squares.forEach(sq => sq.style.backgroundColor = color);
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  return "#" + result.map(x => {
    const hex = parseInt(x).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("").toUpperCase();
}

reset();
