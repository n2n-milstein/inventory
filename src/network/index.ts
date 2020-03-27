import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./config";

const db = firebase.initializeApp(firebaseConfig).firestore();

export default db;
