import { readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getStudents = () => {
  const data = readFileSync(`${__dirname}/students.json`);
  const students = JSON.parse(data);
  return students;
};

export const addStudent = (student) => {
  const studentObj = student;
  const students = getStudents();
  students.push(studentObj)
  const data = JSON.stringify(students)
  writeFileSync(`${__dirname}/students.json`, data);
};
