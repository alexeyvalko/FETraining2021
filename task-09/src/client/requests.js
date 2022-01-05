
export const getAllStudents = async () => {
  const response = await fetch(`/api`); // в настройках webpack используеться прокси сервер поэтому адрес не полный.
  const data = await response.json();
  return data;
};

export const getStudent = async (index) => {
  const response = await fetch(`/api?student=${index}`);
  const data = await response.json();
  return data;
};