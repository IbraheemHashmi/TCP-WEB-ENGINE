/**
 * Builds a raw HTTP response string that browsers can understand.
 */
function buildResponse({ statusCode = 200, body = '', contentType = 'text/plain' }) {
    // Map status codes to their HTTP reason phrases
    const statusMessages = {
        200: 'OK',
        404: 'Not Found',
        500: 'Internal Server Error'
    };

    const statusMessage = statusMessages[statusCode] || 'Unknown';
    const bodyLength = Buffer.byteLength(body, 'utf-8');

    // HTTP requires exact formatting: Status Line, Headers, an empty line, then the Body.
    return `HTTP/1.1 ${statusCode} ${statusMessage}\r\n` +
           `Content-Type: ${contentType}\r\n` +
           `Content-Length: ${bodyLength}\r\n` +
           `Connection: close\r\n` +
           `\r\n` +
           `${body}`;
}

module.exports = { buildResponse };
