import { readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAllStudents = () => {
  const data = readFileSync(`${__dirname}/students.json`);
  const students = JSON.parse(data);
  return students;
};

export const addStudent = (student) => {
  const studentObj = student;
  const students = getAllStudents();
  students.push(studentObj)
  const data = JSON.stringify(students)
  writeFileSync(`${__dirname}/students.json`, data);
};


export const getStudent = (index) => {
  const students = getAllStudents();
  const student = students[index]
  return student
}


export const getStudentIndexFromURL = (url) => {
  const query = url.split('?')[1]
  const params = new URLSearchParams(query)
  const index = params.get('student')
  return index
}

