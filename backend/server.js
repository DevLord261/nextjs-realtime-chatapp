const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketIo = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketIo(server, {
    cors: {
      origin: "http://127.0.0.1:3000", // Allow your client's origin
      methods: ["GET", "POST"],
    },
  });
  function findSocketByUserId(userId) {
    return Object.values(io.sockets.sockets).find(
      (socket) => socket.userId === userId,
    );
  }

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (data) => {
      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    socket.on("private message", ({ to, from, message }) => {
      // Find the socket of the recipient
      const recipientSocket = findSocketByUserId(to);

      if (true) {
        // Send the message only to the recipient
        io.to(from).emit("recive message", {
          from: from,
          message: message,
        });
        console.log("send the message");
      }
    });
  });

  server.listen(3001, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3001");
  });
});
