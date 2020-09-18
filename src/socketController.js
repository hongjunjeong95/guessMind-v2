const socketController = (socket) => {
  socket.on("setNickname", ({ nickname }) => {
    console.log(`${nickname}`);
  });
};

export default socketController;
