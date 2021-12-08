const http = require('http');
const fs = require('fs');
const { pipeline } = require('stream');

const PORT = 3500;

const server = http.createServer((req, res) => {
  try {
    if (req.url === '/api' && req.method === 'POST') {
      pipeline(
        req,
        fs.createWriteStream(`./pizza-${Date.now()}.txt`, { flags: 'a' }),
        (err) => {
          if (err) {
            process.stderr.write(`Pipeline failed: ${err}`);
            process.stdout.write('\n');
            process.exit(1);
          } else {
            process.stdout.write('Succeeded.');
            process.stdout.write('\n');
          }
        },
      );
      res.writeHead(201, {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      });
      res.end(JSON.stringify({ message: 'pizza is received' }));
    } else {
      res.end();
    }
  } catch (error) {
    process.stderr.write(`${error}`);
    process.stdout.write('\n');
    process.exit(1);
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
