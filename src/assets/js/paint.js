import { getSocket } from "./sockets";

const canvas = document.getElementById("jsCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const colors = document.getElementsByClassName("jsColor");
  const boldRange = document.getElementById("jsRangeFill");
  const mode = document.getElementById("jsMode");
  const eraser = document.getElementById("jsEraser");
  const eraserRange = document.getElementById("jsRangeEraser");

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

  const beginPath = (x, y, size) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = size;
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
      getSocket().emit(window.events.beginPath, { x, y, size: ctx.lineWidth });
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

  const setPencil = () => {
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = boldRange.value;
    erasing = false;
  };

  const handleClickColor = (e) => {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    setPencil();
    getSocket().emit(window.events.setPencil);
  };

  const handleInputRangePencil = (e) => {
    const size = e.target.value;
    ctx.lineWidth = size;
  };

  const fill = (color = null) => {
    let currentColor = ctx.fillStyle;
    if (color !== null) {
      ctx.fillStyle = color;
    }
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = currentColor;
  };

  const handleClickFill = () => {
    if (filling) {
      fill();
      getSocket().emit(window.events.fill, { color: ctx.strokeStyle });
    }
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

  const erase = () => {
    erasing = true;
    filling = false;
    ctx.lineWidth = eraserRange.value;
    ctx.globalCompositeOperation = "destination-out";
  };

  const handleClickEraser = () => {
    erase();
    getSocket().emit(window.events.erase);
  };

  export const handleBeganPath = ({ x, y, size }) => beginPath(x, y, size);
  export const handleStrokedPath = ({ x, y, color }) => strokePath(x, y, color);
  export const handleFilled = ({ color }) => fill(color);
  export const handleErased = () => erase();
  export const handleSetPenciled = () => setPencil();
  export const enableCanvas = () => {
    canvas.addEventListener("mousemove", handleMousemove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClickFill);
  };
  export const disableCanvas = () => {
    canvas.removeEventListener("mousemove", handleMousemove);
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mouseleave", handleMouseLeave);
    canvas.removeEventListener("click", handleClickFill);
  };

  if (canvas) {
    enableCanvas();

    Array.from(colors).forEach((color) =>
      color.addEventListener("click", handleClickColor)
    );

    boldRange.addEventListener("input", handleInputRangePencil);
    mode.addEventListener("click", handleClickMode);
    eraser.addEventListener("click", handleClickEraser);
    eraserRange.addEventListener("input", handleInputRangeEraser);
  }
}
