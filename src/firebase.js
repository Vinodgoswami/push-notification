import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyA0L96erZLx_eX4B4X_V97TKcAW5fiMuVU",
  authDomain: "fir-push-notification-b86df.firebaseapp.com",
  projectId: "fir-push-notification-b86df",
  storageBucket: "fir-push-notification-b86df.appspot.com",
  messagingSenderId: "1081593938532",
  appId: "1:1081593938532:web:d310409a0414b582fe1571"
};

console.log('*** Environment ***', process.env.REACT_APP_ENV)
console.log('*** Firebase Config ***', firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-push-notification-scope',
        });
      });
  }
  throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker()
    .then((serviceWorkerRegistration) =>
      getToken(messaging, { vapidKey: "BMslZaD6cXBQPT7de25neGS3iJNNllbxFWkPEBAN67xdjBm997SDbgqgrsvsIhJHCNNbQ9R_R4zBRTP0dPOGHec", serviceWorkerRegistration }));

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
