const http = require('http');
const fs = require('fs');
const { pipeline } = require('stream');

const PORT = 3500;

const server = http.createServer((req, res) => {
  if (req.url === '/api' && req.method === 'POST') {
    pipeline(req, fs.createWriteStream(`./pizza-${Date.now}.txt`, {flags: 'a'}), (err) => {
      if (err) {
        process.stderr.write(`Pipeline failed: ${err}`);
        process.stdout.write('\n');
        process.exit(1);
      } else {
        process.stdout.write('Succeeded.');
        process.stdout.write('\n');
      }
    });
    res.writeHead(201, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'pizza is received' }));
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
