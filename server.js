const net = require('net');
const { parseRequest } = require('./parser');
const { buildResponse } = require('./response');

class CustomHTTPServer {
    constructor() {
        this.routes = {
            GET: {},
            POST: {}
        };
        
        this.server = net.createServer((socket) => this.handleConnection(socket));
    }

    get(path, handler) {
        this.routes.GET[path] = handler;
    }

    post(path, handler) {
        this.routes.POST[path] = handler;
    }

    handleConnection(socket) {
        socket.on('data', (data) => {
            const req = parseRequest(data);
            if (!req) return socket.end();

            console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

            const res = {
                send: (body, statusCode = 200, contentType = 'text/html') => {
                    const rawResponse = buildResponse({ statusCode, body, contentType });
                    socket.write(rawResponse);
                    socket.end();
                }
            };

            const handler = this.routes[req.method] && this.routes[req.method][req.path];
            
            if (handler) {
                handler(req, res);
            } else {
                res.send('<h1>404 Not Found</h1><p>This path does not exist on the server.</p>', 404);
            }
        });

        socket.on('error', (err) => console.error('Socket Error:', err.message));
    }

    listen(port, callback) {
        this.server.listen(port, callback);
    }
}

module.exports = CustomHTTPServer;
