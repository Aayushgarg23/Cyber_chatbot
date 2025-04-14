import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB3YRIoSokGNLrTxMbDRBhYfHHR73o-UV8",
  authDomain: "quirckart-infotech.firebaseapp.com",
  databaseURL: "https://quirckart-infotech-default-rtdb.firebaseio.com",
  projectId: "quirckart-infotech",
  storageBucket: "quirckart-infotech.firebasestorage.app",
  messagingSenderId: "1011544239867",
  appId: "1:1011544239867:web:84e790ac1093508ed60a5e",
  measurementId: "G-0KTRRVB0M2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);