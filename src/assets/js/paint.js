const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const boldRange = document.getElementById("jsRangeFill");
const mode = document.getElementById("jsMode");
const eraser = document.getElementById("jsEraser");
const eraserRange = document.getElementById("jsRangeEraser");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
const INITIAL_LINE_WIDTH = 2.5;

let painting = false;
let filling = false;
let erasing = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.lineWidth = INITIAL_LINE_WIDTH;
ctx.strokeStyle = INITIAL_COLOR;

function handleMousemove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPaint() {
  painting = true;
}

function handleMouseDown() {
  startPaint();
}

function stopPaint() {
  painting = false;
}

function handleMouseUp() {
  stopPaint();
}

function handleMouseLeave() {
  stopPaint();
}

function handleClickColor(e) {
  const color = e.target.style.backgroundColor;
  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = boldRange.value;
}

function handleInputRangeFill(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

function handleClickFill() {
  if (filling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleClickMode() {
  if (!filling) {
    mode.innerHTML = "Paint";
    filling = true;
  } else {
    mode.innerHTML = "Fill";
    filling = false;
  }
}

function handleInputRangeEraser(e) {
  if (erasing) {
    const size = e.target.value;
    ctx.lineWidth = size;
  }
}

function handleClickEraser() {
  erasing = true;
  ctx.lineWidth = eraserRange.value;
  ctx.globalCompositeOperation = "destination-out";
}

function handleClickSave() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", handleMousemove);
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mouseleave", handleMouseLeave);
  canvas.addEventListener("click", handleClickFill);

  Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleClickColor)
  );

  boldRange.addEventListener("input", handleInputRangeFill);
  mode.addEventListener("click", handleClickMode);
  eraser.addEventListener("click", handleClickEraser);
  eraserRange.addEventListener("input", handleInputRangeEraser);
  save.addEventListener("click", handleClickSave);
}
