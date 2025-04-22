
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDA0VQRudjc_0AsetjWShlXWpYgOekqheg",
  authDomain: "dhepune-25.firebaseapp.com",
  projectId: "dhepune-25",
  storageBucket: "dhepune-25.appspot.com",
  messagingSenderId: "399200498739",
  appId: "1:399200498739:web:8ddf7964b1bffaf6861f46"
};

const app = firebase.initializeApp(firebaseConfig);
if(app){
    console.log("Connected ..!")
}
export default app;