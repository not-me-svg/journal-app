import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore/lite";
import { 
  createUserWithEmailAndPassword, 
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";

const googleAuthProvider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyALKwbf6mJsHOHQae4mR8rzJ4fAn4B8cn4",
  authDomain: "journal-app-e4e95.firebaseapp.com",
  projectId: "journal-app-e4e95",
  storageBucket: "journal-app-e4e95.appspot.com",
  messagingSenderId: "959068599171",
  appId: "1:959068599171:web:4e8288f7d86e8ab308fcb6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export {
    auth,
    createUserWithEmailAndPassword,
    collection,
    db,
    deleteDoc,
    doc,
    addDoc,
    getDocs,
    googleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateDoc,
    updateProfile,
    query
}