const databaseServerUrl = 'http://localhost:3000';

export const getAll = async (path) => {
  try {
    const response = await fetch(`${databaseServerUrl}/${path}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const removeById = (path, id) => {
  try {
    return fetch(`${databaseServerUrl}/${path}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error.message);
  }
};
