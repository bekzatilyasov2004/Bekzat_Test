import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDB_fAzju1DX6W4i2iEkHFHDUglnmLB2Uk",
  authDomain: "dropbox-46f59.firebaseapp.com",
  projectId: "dropbox-46f59",
  storageBucket: "dropbox-46f59.appspot.com",
  messagingSenderId: "854089875031",
  appId: "1:854089875031:web:ae6b75e7ccf7d5979bad12"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
export const database = {
  users: firestore.collection('users'),
  docs: firestore.collection('docs'),
  files: firestore.collection('files'),
  date: firebase.firestore.FieldValue.serverTimestamp(),
};

export const storage = firebase.storage();

export const auth = firebase.auth();
