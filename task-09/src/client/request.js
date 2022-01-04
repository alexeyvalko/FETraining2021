
const request = async () => {
  const response = await fetch(`/students`); // в настройках webpack используеться прокси сервер поэтому адрес не полный.
  const data = await response.json();
  return data;
};


export default request