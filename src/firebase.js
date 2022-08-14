import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxdDVYPPOelWj2Vgku-nFmVfvRu_rnVMU",
  authDomain: "anomaly-alert.firebaseapp.com",
  projectId: "anomaly-alert",
  storageBucket: "anomaly-alert.appspot.com",
  messagingSenderId: "242989168036",
  appId: "1:242989168036:web:845da2677d7799a8f5bd31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;