import firebase from 'firebase';
import '@firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from '../../config.js';

const valid = firebaseConfig  && firebaseConfig.apiKey && firebaseConfig.projectId;


try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}
const firebaseAuth = firebase.auth;
const firebaseDatabase = firebase.database;
const fireStore = firebase.firestore();
const storage = firebase.storage();

class FirebaseHelper {
  isValid = valid;
  EMAIL = 'email';
  FACEBOOK = 'facebook';
  GOOGLE = 'google';
  GITHUB = 'github';
  TWITTER = 'twitter';
  auth = firebaseAuth;
  database = firebaseDatabase;
  firestore = fireStore;
  storage = storage;
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  login(provider, info) {
      firebaseAuth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    switch (provider) {
      case this.EMAIL:
        return firebaseAuth().signInWithEmailAndPassword(
          info.email,
          info.password
        );
      case this.FACEBOOK:
        return firebaseAuth().FacebookAuthProvider();
      case this.GOOGLE:
        return firebaseAuth().GoogleAuthProvider();
      case this.GITHUB:
        return firebaseAuth().GithubAuthProvider();
      case this.TWITTER:
        return firebaseAuth().TwitterAuthProvider();
      default:
    }
  }
  logout() {
    return firebaseAuth().signOut();
  }

  isAuthenticated() {
    firebaseAuth().onAuthStateChanged(user => {
      return user ? true : false;
    });
  }
  resetPassword(email) {
    return firebaseAuth().sendPasswordResetEmail(email);
  }
}

export default new FirebaseHelper();
