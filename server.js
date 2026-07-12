const net = require('net');
const { parseRequest } = require('./parser');
const { buildResponse } = require('./response');

class CustomHTTPServer {
    constructor() {
        this.routes = {
            GET: {},
            POST: {}
        };
        
        // Create the raw TCP server
        this.server = net.createServer((socket) => this.handleConnection(socket));
    }

    // Register a GET route
    get(path, handler) {
        this.routes.GET[path] = handler;
    }

    // Register a POST route
    post(path, handler) {
        this.routes.POST[path] = handler;
    }

    // Handle incoming TCP connections
    handleConnection(socket) {
        socket.on('data', (data) => {
            // 1. Parse the incoming raw bytes into a request object
            const req = parseRequest(data);
            if (!req) return socket.end();

            console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

            // 2. Create a response wrapper function for the developer
            const res = {
                send: (body, statusCode = 200, contentType = 'text/html') => {
                    const rawResponse = buildResponse({ statusCode, body, contentType });
                    socket.write(rawResponse);
                    socket.end(); // Close the TCP connection
                }
            };

            // 3. Find the matching route handler
            const handler = this.routes[req.method] && this.routes[req.method][req.path];
            
            if (handler) {
                handler(req, res);
            } else {
                // Return 404 if no route matches
                res.send('<h1>404 Not Found</h1><p>This path does not exist on the server.</p>', 404);
            }
        });

        socket.on('error', (err) => console.error('Socket Error:', err.message));
    }

    // Start listening on a port
    listen(port, callback) {
        this.server.listen(port, callback);
    }
}

module.exports = CustomHTTPServer;
