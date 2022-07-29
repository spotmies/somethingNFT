import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC0tVa-RtZ21CCNn-IP0-p2gsBJraPX7RQ",
  authDomain: "somethingnft-95e15.firebaseapp.com",
  projectId: "somethingnft-95e15",
  storageBucket: "somethingnft-95e15.appspot.com",
  messagingSenderId: "278195555602",
  appId: "1:278195555602:web:d9eb4380827894450f37cb",
  measurementId: "G-4Q4PC65X64",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
