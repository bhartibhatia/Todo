import firebase from "firebase";


const myFirebase = firebase.initializeApp(firebaseConfig);
const db = myFirebase.firestore();
export default db;
