import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import config from "./config";

firebase.initializeApp(config);

export const db = firebase.firestore();

export const functions = firebase.functions();

export const storage = firebase.storage();

export default db;
