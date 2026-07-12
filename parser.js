/**
 * Parses raw TCP Buffer streams into a readable HTTP Request object.
 */
function parseRequest(buffer) {
    const requestString = buffer.toString('utf-8');
    
    // Split the raw string by the standard HTTP line break (Carriage Return + Line Feed)
    const lines = requestString.split('\r\n');
    
    if (lines.length === 0 || !lines[0]) return null;
    
    // The very first line is the Request Line (e.g., "GET /index.html HTTP/1.1")
    const requestLine = lines[0];
    const [method, path, protocol] = requestLine.split(' ');

    const headers = {};
    let bodyStartIndex = -1;

    // Iterate through the lines to extract headers
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
        // In HTTP, a completely blank line separates the headers from the body
        if (line === '') {
            bodyStartIndex = i + 1;
            break;
        }

        const [key, ...valueParts] = line.split(': ');
        if (key) {
            headers[key.toLowerCase()] = valueParts.join(': ');
        }
    }

    const body = bodyStartIndex !== -1 ? lines.slice(bodyStartIndex).join('\r\n') : '';

    return { method, path, protocol, headers, body };
}

module.exports = { parseRequest };
