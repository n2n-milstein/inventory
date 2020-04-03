import firebase from "firebase/app";
import "firebase/firestore";
import config from "./config";

const db = firebase.initializeApp(config).firestore();

export default db;
