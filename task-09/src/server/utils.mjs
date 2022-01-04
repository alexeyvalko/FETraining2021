import { readFileSync, writeFileSync } from 'fs';

export const getStudents = () => {
  const data = readFileSync('./students.json');
  const students = JSON.parse(data);
  return students;
};

export const addStudent = (student) => {
  const studentObj = student;
  const students = getStudents();
  studentObj.id = Date.now();
  students.push(studentObj)
  const data = JSON.stringify(students)
  writeFileSync('./students.json', data);
};
