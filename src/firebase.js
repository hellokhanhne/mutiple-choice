import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMX8jKUp5IlR5NtMD7NL6dI7bax_sZ3nI",
  authDomain: "trac-nghiem-8f4f8.firebaseapp.com",
  projectId: "trac-nghiem-8f4f8",
  storageBucket: "trac-nghiem-8f4f8.appspot.com",
  messagingSenderId: "75348182373",
  appId: "1:75348182373:web:de2cafda95f70b3232cd8c",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = initializeFirestore(app, { experimentalForceLongPolling: true });

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { db, auth, storage };
