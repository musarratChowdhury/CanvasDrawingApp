import { GameCanvas, ArcStatus, IClockStatus } from "./CanvasDrawing.js";

const container = document.querySelector("#container") as HTMLDivElement;
const gameCanvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
const display = document.querySelector(".count-display") as HTMLDivElement;
const colorSelection = document.querySelector("#color") as HTMLInputElement;
const linewidthSelection = document.querySelector(
  "#lineWidth"
) as HTMLInputElement;
const clearBtn = document.querySelector("#clearButton") as HTMLButtonElement;

let isDrawing: boolean = false;
let lastX = 0;
let lastY = 0;

var myGameCanvas = new GameCanvas(
  gameCanvas,
  window.innerWidth * 1,
  window.innerHeight * 0.7,
  "white"
);
myGameCanvas.draw("gray", "black", 4);
myGameCanvas.drawRectangle(22, 22, 100, 50, "tomato");
myGameCanvas.SaveState();
myGameCanvas.drawRectangle(44, 44, 100, 50, "magenta");
myGameCanvas.RestoreState();
myGameCanvas.drawRectangle(66, 66, 100, 50);
gameCanvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  // console.log(e);
  myGameCanvas.lineDrawing(
    lastX,
    lastY,
    e.offsetX,
    e.offsetY,
    Number(linewidthSelection.value),
    colorSelection.value
  );
  lastX = e.offsetX;
  lastY = e.offsetY;
});
gameCanvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
  console.log(colorSelection.value);
});
gameCanvas.addEventListener("mouseup", () => {
  isDrawing = false;
});
gameCanvas.addEventListener("mouseout", () => {
  isDrawing = false;
});
clearBtn.addEventListener("click", () => {
  myGameCanvas.ClearCanvas();
});

myGameCanvas.ClearCanvas();
