import { createContext } from 'react';
import app from 'firebase/app';
import 'firebase/analytics';
import 'firebase/messaging';
import 'firebase/database';

import { firebaseConfig } from '../config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
  }
  analytics() {
    app.analytics();
  }
  async askForPermissionToReceiveNotifications() {
    try {
      const messaging = app.messaging();
      await messaging.requestPermission();

      return await messaging.getToken();
    } catch (error) {
      console.error(error);
    }
  }
  async getTimer(id) {
    const timer = await app.database().ref('/timers/' + id).once('value');
    return timer.val();
  }
  async saveTimer(data) {
    const id = app.database().ref().child('posts').push().key;
    return app.database().ref('timers/' + id).set(data).then(() => ({ ...data, id }));
  }
}

export default new Firebase();

export const FirebaseContext = createContext(null);
