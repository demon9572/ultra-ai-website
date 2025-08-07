// TODO: Replace with your app's Firebase project configuration.
// Find your configuration at: https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = { 
  apiKey: "YOUR_API_KEY", 
  authDomain: "YOUR_AUTH_DOMAIN", 
  projectId: "ultra-ai-assistant-2024",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const analytics = firebase.analytics();