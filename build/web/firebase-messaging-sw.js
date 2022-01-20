importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js");
firebase.initializeApp({
    apiKey: "AIzaSyBhTvlEopyNEAPJUWliEKbW1n7Fm2XjnBQ",
    authDomain: "pushtest-272210.firebaseapp.com",
    databaseURL: "https://pushtest-272210.firebaseio.com",
    projectId: "pushtest-272210",
    storageBucket: "pushtest-272210.appspot.com",
    messagingSenderId: "2542844799",
    appId: "1:2542844799:web:166a4118b144faf85af84a",
    measurementId: "G-466BDJZS14"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});