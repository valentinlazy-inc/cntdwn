import { API_URL } from '../config';

export function post(data) {
  return fetch(`${API_URL}/timers`, {
    method: 'POST',
    body: JSON.stringify(data),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    referrer: 'no-referrer',
  })
    .then(response => response.json());
}

export function get(id) {
  return fetch(`${API_URL}/timers/${id}`)
    .then(response => response.json());
}
