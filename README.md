# ConvoChat - Real-time Chat Application

A modern, feature-rich real-time chat application built with Express.js, Socket.IO, and TypeScript. Connect with others instantly with a beautiful, responsive interface.

## ✨ Features

- **User Registration**: Register with a username (1-20 characters) before chatting
- **Real-time Messaging**: Send and receive messages instantly
- **Online Users List**: See who's currently in the chat with color-coded avatars
- **System Notifications**: Get notified when users join or leave
- **User Avatars**: Custom colors for each user
- **Timestamps**: See when each message was sent
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Modern UI**: Beautiful gradient design with smooth animations
- **Typing Indicators**: Get feedback when others are typing (feature ready)
- **XSS Protection**: HTML escaping to prevent injection attacks

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (or use your existing workspace)
```bash
git clone https://github.com/PletzelOnYT/ConvoChat.git
cd ConvoChat
```

2. **Install dependencies**
```bash
npm install
```

### Running the Application

#### Option 1: Development Mode (with auto-reload)
```bash
npm run dev
```

#### Option 2: Simple Development Mode (no nodemon)
```bash
npm run dev-simple
```

#### Option 3: Production Mode
```bash
npm run build
npm start
```

### Access the Chat
Open your browser and navigate to:
```
http://localhost:3000
```

## 🎮 Usage

1. **Enter your name** in the registration modal (1-20 characters)
2. **Type a message** in the input field at the bottom
3. **Press Enter** or click the Send button to send your message
4. **View online users** in the sidebar (left side)
5. **Click "Leave Chat"** to disconnect and exit

## 📁 Project Structure

```
ConvoChat/
├── src/
│   └── index.ts          # Main server code
├── dist/                 # Compiled JavaScript
├── index.html            # Chat interface
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── README.md             # This file
└── gitpush.bat           # Git push batch script
```

## 🔧 Configuration

### Change Port
Set the `PORT` environment variable:
```bash
PORT=8080 npm start
```

### Modify Colors
Edit the `getRandomColor()` function in `src/index.ts` to customize avatar colors.

## 🌐 API Events

### Client → Server
- `register` - Register a new user with a username
- `chat message` - Send a chat message
- `typing` - Send typing indicator

### Server → Client
- `register success` - User successfully registered
- `register error` - Registration failed with error message
- `chat message` - Receive a chat message
- `user joined` - Notification that a user joined
- `user left` - Notification that a user left
- `user list` - Update of online users list
- `user typing` - Notification that a user is typing

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run start` | Run the production server |
| `npm run dev` | Run in development mode with auto-reload (nodemon) |
| `npm run dev-simple` | Run in development mode (ts-node, no watching) |
| `npm run clean` | Remove dist folder |

## 📝 System Requirements

- **Runtime**: Node.js 18+ with ES Modules support
- **Memory**: ~50MB for typical usage
- **Browser**: Any modern browser (Chrome, Firefox, Safari, Edge)
- **Network**: Stable internet connection for Socket.IO WebSocket

## 🎨 Customization

### Change App Name
Edit the title and branding in `index.html` and add your logo.

### Modify UI Colors
The gradient colors are defined in `index.html`:
- Primary: `#667eea`
- Secondary: `#764ba2`

Change these hex codes to customize the entire color scheme.

### Add New Features
The backend is structured to easily add:
- Private messaging
- Chat rooms
- Message persistence
- File sharing
- Emoji support
- User status (online, away, busy)

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
PORT=3001 npm start
```

### Module Not Found
Make sure to install dependencies:
```bash
npm install
```

### Build Errors
Clean and rebuild:
```bash
npm run clean
npm run build
npm start
```

### Socket.IO Connection Issues
- Ensure firewall allows WebSocket connections
- Check browser console for detailed errors
- Try refreshing the page

## 📦 Dependencies

- **express** - Web server framework
- **socket.io** - Real-time communication library
- **typescript** - Type-safe JavaScript
- **ts-node** - TypeScript execution for Node.js
- **nodemon** - Auto-reload development server

## 📄 License

ISC License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this project. Contributions are welcome!

## 🌟 Future Enhancements

- [ ] Private direct messaging
- [ ] Chat room/channel support
- [ ] Message history/persistence
- [ ] User authentication with passwords
- [ ] File sharing
- [ ] Emoji and reaction support
- [ ] Night mode/theme switching
- [ ] Message search
- [ ] User profiles
- [ ] Admin controls

---

**Made with ❤️ using Express.js and Socket.IO**
