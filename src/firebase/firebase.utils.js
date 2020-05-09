import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBvmrLHhp6rX5j3Ap7IvLlaQuACQeaCffM",
  authDomain: "crwn-db-d77af.firebaseapp.com",
  databaseURL: "https://crwn-db-d77af.firebaseio.com",
  projectId: "crwn-db-d77af",
  storageBucket: "crwn-db-d77af.appspot.com",
  messagingSenderId: "164594056479",
  appId: "1:164594056479:web:f30f98efa869ae42cc442a",
  measurementId: "G-Y8NT2CGQME",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account " });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
