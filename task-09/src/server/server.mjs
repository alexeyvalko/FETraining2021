import { createServer } from 'http';

const PORT = 3500;

const serverHandler = (req, res) => {
  try {
    const { url, method } = req;
    if (url === '/api' && method === 'GET') {
      res.end(JSON.stringify({ message: 'Hello word' }));
    } else {
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  } catch (error) {
    process.stderr.write(`${error.message}`);
    process.stdout.write('\n');
  }
};

const server = createServer(serverHandler);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
