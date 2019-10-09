import { API_URL } from '../config';

export function subscribeToTimer(token, timerID) {
  return fetch(`${API_URL}/api/pushes`, {
    method: 'POST',
    body: JSON.stringify({ token, timerID }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    referrer: 'no-referrer',
  });
}
