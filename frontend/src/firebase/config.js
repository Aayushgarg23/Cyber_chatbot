import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

{/* Add Firebase Auth Details*/}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
