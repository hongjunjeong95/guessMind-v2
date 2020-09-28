import { handleNewuser } from "./notifications";
import { initSocket } from "./sockets";

const USERNAME = "username";
const username = localStorage.getItem(USERNAME);

const aSocket = io("/");
initSocket(aSocket);
if (username !== null) {
  handleNewuser({ username });
}
