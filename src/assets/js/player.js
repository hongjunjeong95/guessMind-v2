import { hideChat, showChat } from "./chat";
import {
  disableCanvas,
  enableCanvas,
  hideControls,
  resetCanvas,
  showControls,
} from "./paint";

const board = document.getElementById("jsPBoard");
const notif = document.getElementById("jsNotifs");
const timeOut = document.getElementById("jsTimeOut");

let count = null;
let counter = null;

const addPlayers = (players) => {
  board.innerHTML = "";
  players.forEach((player) => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.username}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setTimeOut = () => {
  count--;
  if (count <= 0) {
    clearTimeout(counter);
  }
  timeOut.innerText = `Time: ${count}`;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  disableCanvas();
  hideControls();
  showChat();
  clearTimeout(counter);
  notif.innerText = "";
  count = 30;
  counter = setInterval(setTimeOut, 1000);
};
export const handlePainterNotif = ({ word }) => {
  enableCanvas();
  showControls();
  hideChat();
  notif.innerText = `You are the painter, word: ${word}`;
};
export const handleGameEnded = () => {
  notif.innerText = "";
  clearTimeout(counter);
  disableCanvas();
  hideControls();
  resetCanvas();
};
