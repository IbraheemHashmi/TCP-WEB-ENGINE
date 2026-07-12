# 🚀 TCP Web Engine (Zero-Dependency HTTP Server)

A fully functional, multithreaded-capable HTTP Web Server built entirely from scratch using raw TCP sockets in Node.js. 

This project demonstrates a deep understanding of low-level networking, the HTTP protocol, and system architecture by avoiding all external frameworks (like Express or Fastify) and even bypassing Node's built-in `http` module.

## 🧠 Why Build This?
Modern web development often abstracts away the core mechanics of the internet. By building the underlying engine from scratch, this project proves:
1. **Low-level Networking:** Mastery of TCP sockets, byte streams, and the `net` module.
2. **Protocol Parsing:** Understanding of how HTTP actually functions under the hood (headers, body separation, carriage returns).
3. **Architecture Design:** Abstracting complex byte-level logic into clean, modular components (`parser`, `response`, `router`).

## ⚙️ How It Works

When a browser makes a request to a website, it sends a raw stream of binary bytes. This engine intercepts those raw bytes and processes them:

1. **`server.js`:** Opens a raw TCP socket and listens for incoming network connections.
2. **`parser.js`:** Decodes the binary buffer into text and parses the standard HTTP strings (Request Line, Headers, Body).
3. **`response.js`:** Manually constructs the exact HTTP formatted response strings (with Status Codes, Content-Length, and Content-Type) and transmits them back through the socket.

## 🛠️ Tech Stack
*   **Language:** JavaScript (ES6+)
*   **Runtime:** Node.js
*   **Dependencies:** `0` (Zero `node_modules` required)

## 🚀 Getting Started

Since there are exactly **zero dependencies**, running this project takes less than 2 seconds.

1. Clone the repository:
   ```bash
   git clone https://github.com/IbraheemHashmi/TCP-WEB-ENGINE.git
   ```
2. Run the server:
   ```bash
   node app.js
   ```
3. Open your browser and navigate to `http://localhost:8080`.

## 📡 API Endpoints

The server includes a lightweight built-in routing system.

*   `GET /` - Returns the static HTML homepage.
*   `GET /api/status` - Returns a JSON payload with server health metrics.
