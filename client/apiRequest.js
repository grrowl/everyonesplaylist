
class APIError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export default function request(path) {
  return fetch(`/api/${path}`, {
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
}

