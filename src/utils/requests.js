
const parseJson = (response) => (response.status === 204 ? {} : response.json());

export const getRequest = (url) => {

  return fetch(url, { method: 'GET' })
    .then(parseJson);
}
