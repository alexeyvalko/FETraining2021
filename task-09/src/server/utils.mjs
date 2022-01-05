import { readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAllStudents = () => {
  const data = readFileSync(`${__dirname}/students.json`);
  const students = JSON.parse(data);
  return students;
};

export const pushStudent = (student) => {
  const studentObj = student;
  const students = getAllStudents();
  students.push(studentObj);
  const data = JSON.stringify(students);
  writeFileSync(`${__dirname}/students.json`, data);
};

export const getStudent = (index) => {
  const students = getAllStudents();
  const student = students[index];
  if (student) {
    return student;
  }
  return { message: 'No more students' };
};

export const getStudentIndexFromURL = (url) => {
  const query = url.split('?')[1];
  const params = new URLSearchParams(query);
  const index = params.get('student');
  return index;
};

export const addStudent = (req) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const student = JSON.parse(body)
    pushStudent(student);
  });
};

const updateStudentInFile = (student, index) => {
  const students = getAllStudents();
  students[index] = student
  const data = JSON.stringify(students)
  writeFileSync(`${__dirname}/students.json`, data);
}

export const updateStudent = (req, index) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const student = JSON.parse(body)
    updateStudentInFile(student, index)
  });
}


export const delStudent = (index) => {
  const oldStudents = getAllStudents();
  const students = oldStudents.filter((student, indx) => {
    const isStudent = indx !== parseFloat(index)
    return isStudent
  })
  const data = JSON.stringify(students)
  writeFileSync(`${__dirname}/students.json`, data);
}