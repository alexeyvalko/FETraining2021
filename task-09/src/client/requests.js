export const getAllStudents = async () => {
  const response = await fetch(`/api`); // в настройках webpack используеться прокси сервер поэтому адрес не полный.
  const data = await response.json();
  return data;
};

export const getStudent = async (index) => {
  const indx = index < 0 ? 0 : index;
  const response = await fetch(`/api?student=${indx}`);
  const data = await response.json();
  return data;
};

export const addStudent = async (student) => {
  await fetch(`/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
};

export const updateStudent = async (student, index) => {
  await fetch(`/api?student=${index}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
};


export const delStudent = async (index) => {
  await fetch(`/api?student=${index}`, {
    method: 'DELETE',
  });
};