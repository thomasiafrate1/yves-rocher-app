// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyA9-3eBzcw1R5ToT75piKNyFBrhazmK28s",

  authDomain: "yves-rocher-app-d0008.firebaseapp.com",

  databaseURL: "https://yves-rocher-app-d0008-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "yves-rocher-app-d0008",

  storageBucket: "yves-rocher-app-d0008.firebasestorage.app",

  messagingSenderId: "830078884127",

  appId: "1:830078884127:web:57f2cf3e1eecb83d34b82a"

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
