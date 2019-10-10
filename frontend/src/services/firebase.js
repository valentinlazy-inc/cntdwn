import { createContext } from 'react';
import app from 'firebase/app';
import 'firebase/analytics';
import 'firebase/messaging';
import 'firebase/database';

import { firebaseConfig } from '../config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    try {
      this.workerPromise = navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          app.messaging().useServiceWorker(registration);
        });
    } catch (err) {
      console.error(err);
    }
  }
  analytics() {
    app.analytics();
  }
  async askForPermissioToReceiveNotifications() {
    try {
      await this.workerPromise.then(() => {});
      const messaging = app.messaging();
      if (Notification.permission === 'default') {
        await messaging.requestPermission();
      }

      return await messaging.getToken();
    } catch (error) {
      console.error(error);
    }
  }
  async getTimer(id) {
    await this.workerPromise.then(() => {});
    const timer = await app.database().ref('/timers/' + id).once('value');
    return timer.val();
  }
  async saveTimer(data) {
    await this.workerPromise.then(() => {});
    const id = app.database().ref().child('posts').push().key;
    return app.database().ref('timers/' + id).set(data).then(() => ({ ...data, id }));
  }
}

export default new Firebase();

export const FirebaseContext = createContext(null);
