import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAEeeNrf6ryWrNLknIny4dTo97RxsF2mA",
    authDomain: "reactcourse-99cf9.firebaseapp.com",
    projectId: "reactcourse-99cf9",
    storageBucket: "reactcourse-99cf9.appspot.com",
    messagingSenderId: "770866579408",
    appId: "1:770866579408:web:1e8a553ba158c53e285bd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserFromAuth = async (userAuth, additionalInfo = {}) => {
    const userdocRef = doc(db, 'users', userAuth.uid);

    console.log(userdocRef);

    const userSnapshot = await getDoc(userdocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userdocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return userdocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}