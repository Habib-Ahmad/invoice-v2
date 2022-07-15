// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { API_KEY } from '@env';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: 'invoice-app-2-bf99b.firebaseapp.com',
	projectId: 'invoice-app-2-bf99b',
	storageBucket: 'invoice-app-2-bf99b.appspot.com',
	messagingSenderId: '439739784677',
	appId: '1:439739784677:web:7ecf981ca62fa8d7d8630c',
	measurementId: 'G-8BHCZ89HCS',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
