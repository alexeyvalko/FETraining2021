import { createServer } from 'http';
import { getStudents } from './utils.mjs';

const PORT = 3500;

const serverHandler = (req, res) => {
  try {
    const { url, method } = req;
    if (url === '/students' && method === 'GET') {
      const students = getStudents()
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(students));
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
