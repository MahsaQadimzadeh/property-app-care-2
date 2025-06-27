// // src/firebase.ts
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "...",
//   authDomain: "...",
//   projectId: "...",
//   storageBucket: "...",
//   messagingSenderId: "...",
//   appId: "..."
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const storage = getStorage(app);

//////////////////////////////
//Import required services from Firebase;
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };

