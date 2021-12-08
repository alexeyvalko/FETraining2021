const request = async (item) => {
  const response = await fetch(`/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  const result = await response.json();
  return result;
};

export default request;
