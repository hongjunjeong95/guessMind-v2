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

const addPlayers = (players) => {
  board.innerHTML = "";
  players.forEach((player) => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.username}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  disableCanvas();
  hideControls();
  showChat();
  notif.innerText = "";
};
export const handlePainterNotif = ({ word }) => {
  enableCanvas();
  showControls();
  hideChat();
  notif.innerText = `You are the painter, word: ${word}`;
};
export const handleGameEnded = () => {
  notif.innerText = "";
  disableCanvas();
  hideControls();
  resetCanvas();
};
