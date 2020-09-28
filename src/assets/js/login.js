import { handleNewuser } from "./notifications";
import { initSocket } from "./sockets";

const logOut = document.getElementById("jsLogOut");
const USERNAME = "username";
const username = localStorage.getItem(USERNAME);

const aSocket = io("/");
initSocket(aSocket);
if (username !== null) {
  handleNewuser({ username });
}

const handleLogOut = (e) => {
  localStorage.removeItem(USERNAME);
};

logOut.addEventListener("click", handleLogOut);
