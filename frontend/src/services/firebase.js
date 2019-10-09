import { createContext } from 'react';
import app from 'firebase/app';
import 'firebase/analytics';
import 'firebase/messaging';

import { firebaseConfig } from '../config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        app.messaging().useServiceWorker(registration);
      });
  }
  analytics() {
    app.analytics();
  }
  async askForPermissioToReceiveNotifications() {
    try {
      const messaging = app.messaging();
      await messaging.requestPermission();

      return await messaging.getToken();
    } catch (error) {
      console.error(error);
    }
  }
}

export default Firebase;

export const FirebaseContext = createContext(null);
