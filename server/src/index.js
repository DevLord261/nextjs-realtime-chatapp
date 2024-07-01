const express = require("express");

const cors = require("cors");
const { createServer } = require("http");
const { Server: Index } = require("socket.io");
const { DBContext } = require("./DBContext");

const app = express();
const httpServer = createServer(app);
const jwt = require("jsonwebtoken");
const secretkey = "enjoywebprogramming";
// Configure CORS for Express
const corsOptions = {
  origin: ["http://127.0.0.1:3000", "http://localhost:3000"], // Replace with your frontend domain
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

// Initialize Socket.IO with CORS configuration
const io = new Index(httpServer, {
  cors: corsOptions,
});

const port = 4000;
const context = new DBContext();

// Find socket by user ID function
function findSocketByUserId(userId) {
  return Object.values(io.sockets.sockets).find(
    (socket) => socket.userId === userId,
  );
}

// Express routes
app.post("/api/checkuser", async (req, res) => {
  const { username } = req.body;
  try {
    const exists = await context.checkifexists(username);
    if (exists) res.json({ exists: true });
    else return res.json({ exists: false });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    await context.newuser(username, password).then((result) => {
      if (result) {
        var token = jwt.sign({ user: username, pass: password }, secretkey, {
          expiresIn: "1h",
        });
        return res.json({ result: true, accessToken: token });
      }
      return res.json({ result: false });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    await context.signin(username, password).then((result) => {
      if (result) {
        var token = jwt.sign({ user: username, pass: password }, secretkey, {
          expiresIn: "1h,
        });
        return res.json({ result: true, accessToken: token });
      }
      return res.json({ result: false });
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/api/checklogin", async (req, res) => {
  const { accesstoken } = req.body;
  try {
    jwt.verify(accesstoken, secretkey, function(err, result) {
      if (err) return res.json({ result: false });
      return res.json({ result: true });
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ error: "An error occurred" });
  }
});

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle custom event
  socket.on("private message", (message) => {
    console.log(message);
    // Emit an event to the client
    socket.to(message.to).emit("recieve message", {
      from: message.from,
      message: message.message,
    });
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the HTTP server
httpServer.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
