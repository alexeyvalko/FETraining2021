import { createServer } from 'http';
import {
  getAllStudents,
  getStudentIndexFromURL,
  getStudent,
  addStudent,
  updateStudent,
  delStudent,
} from './utils.mjs';

const PORT = 3500;

const serverHandler = (req, res) => {
  try {
    const URL_REGEX = /^\/api\?student=[0-9]{1,}$/;
    const { url, method } = req;
    if (url === '/api' && method === 'GET') {
      const students = getAllStudents();
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(students));
    } else if (url === '/api' && method === 'POST') {
      addStudent(req, res);
      res.writeHead(201);
      res.end();
    } else if (url.match(URL_REGEX) && method === 'PUT') {
      const studentIndex = getStudentIndexFromURL(url);
      updateStudent(req, studentIndex);
      res.writeHead(201);
      res.end();
    } else if (url.match(URL_REGEX) && method === 'DELETE') {
      const studentIndex = getStudentIndexFromURL(url);
      console.log('as');
      delStudent(studentIndex);
      res.writeHead(204);
      res.end();
    } else if (url.match(URL_REGEX) && method === 'GET') {
      const studentIndex = getStudentIndexFromURL(url);
      const student = getStudent(studentIndex);
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(student));
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
