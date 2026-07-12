function parseRequest(buffer) {
    const requestString = buffer.toString('utf-8');
    const lines = requestString.split('\r\n');
    
    if (lines.length === 0 || !lines[0]) return null;
    
    const requestLine = lines[0];
    const [method, path, protocol] = requestLine.split(' ');

    const headers = {};
    let bodyStartIndex = -1;

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
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
