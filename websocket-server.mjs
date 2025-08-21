import { WebSocketServer } from "ws";
import { createServer } from "http";

console.log("Starting WebSocket server...");

const server = createServer((req, res) => {
  console.log(`HTTP Request: ${req.method} ${req.url}`);

  // Handle HTTP requests for notifications
  if (req.method === "POST" && req.url === "/notify") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const { sessionId, type, action } = data;

        console.log(`Received notification: ${type} for session ${sessionId}`);

        // Send message to the specific session's WebSocket connection
        const connection = connections.get(sessionId);
        if (connection && connection.readyState === 1) {
          // WebSocket.OPEN
          connection.send(
            JSON.stringify({
              type,
              sessionId,
              action,
              timestamp: new Date().toISOString(),
            })
          );
          console.log(`WebSocket message sent to session ${sessionId}`);
        } else {
          console.log(
            `No active WebSocket connection for session ${sessionId}`
          );
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        console.error("Error processing notification:", error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

console.log("HTTP server created");

const wss = new WebSocketServer({ server });
console.log("WebSocket server created");

// Store connections by sessionId
const connections = new Map();

wss.on("connection", (ws, req) => {
  console.log("New WebSocket connection attempt");

  const url = new URL(req.url, `http://${req.headers.host}`);
  const sessionId = url.searchParams.get("sessionId");

  if (sessionId) {
    connections.set(sessionId, ws);
    console.log(`WebSocket connection established for session: ${sessionId}`);

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log(`Message from session ${sessionId}:`, data);
      } catch (error) {
        console.error("Invalid JSON message:", message.toString(), error);
      }
    });

    ws.on("close", () => {
      connections.delete(sessionId);
      console.log(`WebSocket connection closed for session: ${sessionId}`);
    });

    ws.on("error", (error) => {
      console.error(`WebSocket error for session ${sessionId}:`, error);
      connections.delete(sessionId);
    });
  } else {
    console.log("WebSocket connection without sessionId, closing...");
    ws.close();
  }
});

const PORT = process.env.WS_PORT || 3012;

server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

// Function to broadcast to all connections
export function broadcast(message) {
  connections.forEach((ws) => {
    if (ws.readyState === 1) {
      // WebSocket.OPEN
      ws.send(JSON.stringify(message));
    }
  });
}

// Function to send message to specific session
export function sendToSession(sessionId, message) {
  const ws = connections.get(sessionId);
  if (ws && ws.readyState === 1) {
    ws.send(JSON.stringify(message));
    return true;
  }
  return false;
}

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down WebSocket server...");
  connections.forEach((ws) => {
    ws.close();
  });
  server.close(() => {
    console.log("WebSocket server closed");
    process.exit(0);
  });
});
