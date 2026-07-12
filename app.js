const CustomHTTPServer = require('./server');

const app = new CustomHTTPServer();
const PORT = 8080;

app.get('/', (req, res) => {
    const html = `
        <html>
            <body style="font-family: sans-serif; background: #0D1117; color: white; text-align: center; padding-top: 50px;">
                <h1>🚀 Custom HTTP Server is Live!</h1>
                <p>This web page was served by a raw TCP socket server built entirely from scratch in Node.js.</p>
                <p>No Express. No HTTP module. Zero dependencies.</p>
                <br>
                <a href="/api/status" style="color: #61DAFB;">Check API Status</a>
            </body>
        </html>
    `;
    res.send(html, 200, 'text/html');
});

app.get('/api/status', (req, res) => {
    const jsonResponse = JSON.stringify({
        status: 'online',
        uptime: process.uptime(),
        engine: 'custom-tcp-server',
        version: '1.0.0'
    });
    res.send(jsonResponse, 200, 'application/json');
});

app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🔥 TCP Web Engine running on port ${PORT}`);
    console.log(`👉 http://localhost:${PORT}`);
    console.log(`========================================`);
});
