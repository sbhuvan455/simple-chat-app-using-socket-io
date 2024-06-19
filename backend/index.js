import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log("socket is connected");

    socket.on('join Room', (username, room) => {
        socket.join(room);
        socket.broadcast.to(room).emit("user joined", `${username} joined the chat`);
    })

    socket.on('disconnect', () => {
        console.log("socket disconnected");
    })
})

server.listen(3000, () => {
    console.log("listening on port 3000");
})