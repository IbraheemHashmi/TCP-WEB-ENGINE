function buildResponse({ statusCode = 200, body = '', contentType = 'text/plain' }) {
    const statusMessages = {
        200: 'OK',
        404: 'Not Found',
        500: 'Internal Server Error'
    };

    const statusMessage = statusMessages[statusCode] || 'Unknown';
    const bodyLength = Buffer.byteLength(body, 'utf-8');

    return `HTTP/1.1 ${statusCode} ${statusMessage}\r\n` +
           `Content-Type: ${contentType}\r\n` +
           `Content-Length: ${bodyLength}\r\n` +
           `Connection: close\r\n` +
           `\r\n` +
           `${body}`;
}

module.exports = { buildResponse };
