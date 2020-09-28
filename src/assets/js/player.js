import {
  disableCanvas,
  enableCanvas,
  hideControls,
  showControls,
} from "./paint";

const board = document.getElementById("jsPBoard");
const notif = document.getElementById("jsNotifs");

const addPlayers = (players) => {
  console.log("playerupdate", players);
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
};
export const handlePainterNotif = ({ word }) => {
  console.log("I'm painternoitf");
  enableCanvas();
  showControls();
  console.log(`You are the painter, word: ${word}`);
  notif.innerText = `You are the painter, word: ${word}`;
};
export const handleGameEnded = () => {
  notif.innerText = "";
};
