import express, { Express, Request, Response } from "express";
import { createServer } from "node:http";
import path from "node:path";
import { Server, Socket } from "socket.io";
import { fileURLToPath } from "url";

const app: Express = express();
const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Fix __dirname in ES modules / TypeScript
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Track connected users
interface User {
  id: string;
  name: string;
  color: string;
  joinedAt: Date;
}

const users = new Map<string, User>();

// Generate a random color for each user
function getRandomColor(): string {
  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
    "#F7DC6F", "#BB8FCE", "#85C1E2", "#F8B88B", "#A8E6CF"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Validate username
function isValidUsername(name: string): boolean {
  return Boolean(name && name.trim().length >= 1 && name.trim().length <= 20);
}

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "../public")));

// Serve index.html at root
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Socket.IO chat
io.on("connection", (socket: Socket) => {
  console.log(`[User connected] Socket ID: ${socket.id}`);

  socket.on("register", (username: string) => {
    // Validate and sanitize username
    if (!isValidUsername(username)) {
      socket.emit("register error", "Username must be 1-20 characters");
      return;
    }

    const sanitizedName = username.trim();

    // Check if username already taken
    for (let user of users.values()) {
      if (user.name.toLowerCase() === sanitizedName.toLowerCase()) {
        socket.emit("register error", "Username already taken");
        return;
      }
    }

    // Register user
    const user: User = {
      id: socket.id,
      name: sanitizedName,
      color: getRandomColor(),
      joinedAt: new Date()
    };

    users.set(socket.id, user);
    console.log(`[User registered] ${sanitizedName} (${socket.id})`);

    // Notify user of successful registration
    socket.emit("register success", {
      username: user.name,
      color: user.color,
      onlineCount: users.size
    });

    // Notify all other users
    socket.broadcast.emit("user joined", {
      username: user.name,
      onlineCount: users.size,
      timestamp: new Date().toLocaleTimeString()
    });

    // Send updated user list to everyone
    broadcastUserList();
  });

  socket.on("chat message", (msg: string) => {
    const user = users.get(socket.id);

    if (!user) {
      socket.emit("error", "You must register first");
      return;
    }

    // Validate message
    if (!msg || msg.trim().length === 0) {
      return;
    }

    const sanitizedMsg = msg.trim();
    const timestamp = new Date().toLocaleTimeString();

    console.log(`[Message] ${user.name}: ${sanitizedMsg}`);

    // Emit message with user info
    io.emit("chat message", {
      username: user.name,
      message: sanitizedMsg,
      color: user.color,
      timestamp: timestamp,
      userId: socket.id
    });
  });

  socket.on("typing", (isTyping: boolean) => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit("user typing", {
        username: user.name,
        isTyping: isTyping
      });
    }
  });

  socket.on("disconnect", () => {
    const user = users.get(socket.id);

    if (user) {
      console.log(`[User disconnected] ${user.name} (${socket.id})`);
      users.delete(socket.id);

      // Notify others user left
      io.emit("user left", {
        username: user.name,
        onlineCount: users.size,
        timestamp: new Date().toLocaleTimeString()
      });

      // Send updated user list
      broadcastUserList();
    }
  });
});

function broadcastUserList() {
  const userList = Array.from(users.values()).map(u => ({
    name: u.name,
    color: u.color,
    joinedAt: u.joinedAt
  }));

  io.emit("user list", {
    users: userList,
    count: users.size
  });
}

// Start server
server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`[server]: Open your browser at http://localhost:${port}`);
});
