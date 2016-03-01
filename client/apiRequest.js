
class APIError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export default function request(path, method = 'GET') {
  return fetch(`/api/${path}`, {
      method,
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300)
        return response;
      else
        throw new APIError('API Error', response)
        // response here will raw, not json-parsed
    })
    .then(response => response.json())
    .catch(err => {
      console.err('API Error:', err.message);
      throw err;
    })
}

