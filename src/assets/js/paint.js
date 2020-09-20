import { getSocket } from "./sockets";

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

const beginPath = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const strokePath = (x, y, color = null) => {
  let currentColor = ctx.strokeStyle;
  if (color !== null) {
    ctx.strokeStyle = color;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = currentColor;
};

const handleMousemove = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    beginPath(x, y);
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    strokePath(x, y);
    getSocket().emit(window.events.strokePath, {
      x,
      y,
      color: ctx.strokeStyle,
    });
  }
};

const startPaint = () => {
  painting = true;
};

const stopPaint = () => {
  painting = false;
};

const handleMouseDown = () => {
  startPaint();
};

const handleMouseUp = () => {
  stopPaint();
};

const handleMouseLeave = () => {
  stopPaint();
};

const handleClickColor = (e) => {
  const color = e.target.style.backgroundColor;
  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = boldRange.value;
};

const handleInputRangeFill = (e) => {
  const size = e.target.value;
  ctx.lineWidth = size;
};

const handleClickFill = () => {
  if (filling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};

const handleClickMode = () => {
  if (!filling) {
    mode.innerHTML = "Paint";
    filling = true;
  } else {
    mode.innerHTML = "Fill";
    filling = false;
  }
};

const handleInputRangeEraser = (e) => {
  if (erasing) {
    const size = e.target.value;
    ctx.lineWidth = size;
  }
};

const handleClickEraser = () => {
  erasing = true;
  ctx.lineWidth = eraserRange.value;
  ctx.globalCompositeOperation = "destination-out";
};

const handleClickSave = () => {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
};

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

export const handleBeganPath = ({ x, y }) => beginPath(x, y);

export const handleStrokedPath = ({ x, y, color }) => strokePath(x, y, color);
