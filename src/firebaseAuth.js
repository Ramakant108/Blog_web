import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,getAuth,signOut, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDbvVQrKUhy18jUAFvPPnPGnHm_eYPWJtE",
  authDomain: "blog-web-17090.firebaseapp.com",
  projectId: "blog-web-17090",
  storageBucket: "blog-web-17090.firebasestorage.app",
  messagingSenderId: "496050036962",
  appId: "1:496050036962:web:2134f0a1bf82cb5efc7ebb",
  measurementId: "G-X0BM6E55Q3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const db=getFirestore(app);
// const storeg=getStorage(app);


const Signup=async(firstName,LastName,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await updateProfile(user,{displayName:`${firstName} ${LastName}`})
    } catch (error) {
        toast.error(error.code)
    }
}

const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        toast.error(error.code)
    }
}

const logout=async()=>{
   signOut(auth);
}

export {logout,login,Signup,auth,db}