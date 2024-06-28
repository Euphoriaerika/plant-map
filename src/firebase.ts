import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYXY3DyzvugYhW_jm6l41SqySXtSvXLOE",
  authDomain: "map-points-a29e6.firebaseapp.com",
  projectId: "map-points-a29e6",
  storageBucket: "map-points-a29e6.appspot.com",
  messagingSenderId: "451685253062",
  appId: "1:451685253062:web:158292f24f22f747b37cc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };