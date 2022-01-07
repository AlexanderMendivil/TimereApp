import * as firebase from "firebase";
import "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDxfgagq-Glxm9i82SkFcWILAvgrdieTI",
    authDomain: "timere-1e1e9.firebaseapp.com",
    projectId: "timere-1e1e9",
    storageBucket: "timere-1e1e9.appspot.com",
    messagingSenderId: "369884692178",
    appId: "1:369884692178:web:2ade1548f4e1b3502bb70b"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
     app = firebase.initializeApp(firebaseConfig);
    }else{
    app = firebase.app();
}

const auth = firebase.auth()
const db = firebase.firestore()
const storageFirebase = firebase.storage()
const state_changed = firebase.storage.TaskEvent.STATE_CHANGED
export {auth, db, storageFirebase, state_changed};