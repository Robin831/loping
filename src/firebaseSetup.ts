// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6O4g-jrgnOgLBD8hYzYJi3nZjd65vdMs",
  authDomain: "loping-2eba3.firebaseapp.com",
  projectId: "loping-2eba3",
  storageBucket: "loping-2eba3.appspot.com",
  messagingSenderId: "951513826568",
  appId: "1:951513826568:web:80394ef7d246cbedec58bd"
};



export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
  
export const db = getFirestore(app);