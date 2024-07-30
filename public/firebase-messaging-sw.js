importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyA0L96erZLx_eX4B4X_V97TKcAW5fiMuVU",
  authDomain: "fir-push-notification-b86df.firebaseapp.com",
  projectId: "fir-push-notification-b86df",
  storageBucket: "fir-push-notification-b86df.appspot.com",
  messagingSenderId: "1081593938532",
  appId: "1:1081593938532:web:d310409a0414b582fe1571"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
