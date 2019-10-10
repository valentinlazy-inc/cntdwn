import { API_URL } from '../config';

import Firebase from './firebase';

export async function post(data) {
  console.log(data);
  try {
    const timer = await Firebase.saveTimer(data);
    await fetch(`${API_URL}/api/timers`, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      referrer: 'no-referrer',
    })
      .then(response => response.json());
    
    return timer;
  } catch (err) {
    console.error(err);
  }
}

export function get(id) {
  try {
    return Firebase.getTimer(id);
  } catch (err) {
    console.error(err);
  }
  
  return fetch(`${API_URL}/api/timers/${id}`)
    .then(response => response.json());
}
