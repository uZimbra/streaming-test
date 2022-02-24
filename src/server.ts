import cors from "cors";
import express from "express";
import morgan from "morgan";
import { Socket } from "socket.io";

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/preview", (request, response) => {
  response.sendFile(__dirname + "/preview.html");
});

io.on("connection", (socket: Socket) => {
  console.log(`Socket: Client ${socket.id} connected!`);

  socket.on("disconnect", () => {
    console.log(`Socket: Client ${socket.id} disconnected!`);
  });

  socket.on("stream", function (data) {
    socket.broadcast.emit("stream", data);
  });
});

server.listen(3333, () =>
  console.log("Server running on http://localhost:3333")
);
