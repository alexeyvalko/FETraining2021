const request = async (pizza) => {
  const response = await fetch(`/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizza),
  });
  const result = await response.json();
  return result;
};

export default request;
