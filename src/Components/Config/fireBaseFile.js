import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, getDatabase } from "@firebase/database"
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyA8FAhRAG5fbfX35uQF8OhZK4fLIs5i8pw",
    authDomain: "stepupdas.firebaseapp.com",
    databaseURL: "https://stepupdas-default-rtdb.firebaseio.com",
    projectId: "stepupdas",
    storageBucket: "stepupdas.appspot.com",
    messagingSenderId: "835619372316",
    appId: "1:835619372316:web:1b21f8feec15c5be0d8ed9",
    measurementId: "G-MLNX8E99XY"
  };

  const app = initializeApp(firebaseConfig);


  export const db = getDatabase(app);
  export const storage = getStorage(app);

