// Firebase Service Worker Libraries
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// --- तुमचे FIREBASE CONFIGURATION (इथे पुन्हा सेम कॉन्फिग टाका) ---
const firebaseConfig = {
    apiKey: "AIzaSyD_FzNXQFV-8NHWW5_TlAE3jstlgHMC3pA",
    authDomain: "retail-connect-app-93b25.firebaseapp.com",
    projectId: "retail-connect-app-93b25",
    storageBucket: "retail-connect-app-93b25.firebasestorage.app",
    messagingSenderId: "466881998325",
    appId: "1:466881998325:web:8f3c1c281c814973fa44bc",
    measurementId: "G-NNQECE45JH"
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// बॅकग्राउंडमध्ये मेसेज आल्यावर तो स्क्रीनवर कसा दाखवायचा याचे लॉजिक
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Background Message Received: ', payload);

    const notificationTitle = payload.data.title || payload.notification.title || 'RetailConnect Offer';
    const notificationOptions = {
        body: payload.data.body || payload.notification.body || 'नवीन ऑफर उपलब्ध!',
        icon: '/favicon.ico', // तुमच्या दुकानाचा आयकॉन (असेल तर)
        image: payload.data.imageUrl || null, // रिटेलरने पाठवलेला इमेज बॅनर
        data: {
            url: payload.data.click_action || '/'
        }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// मेसेजवर क्लिक केल्यावर PWA ओपन करण्याचे लॉजिक
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});