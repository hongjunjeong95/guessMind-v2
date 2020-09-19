const body = document.querySelector("body");

export const handleNewuser = ({ nickname }) => {
  const notification = document.createElement("div");
  notification.innerText = `${nickname} just joined!`;
  notification.style.backgroundColor = "rgb(0, 122, 255)";
  notification.className = "notification";
  body.appendChild(notification);
};
