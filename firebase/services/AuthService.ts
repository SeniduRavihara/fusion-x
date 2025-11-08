import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../config";

class AuthService {
  static async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async login({ email, password }: { email: string; password: string }) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(userCredential);
      return userCredential.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async signup({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(userCredential);
      const user = userCredential.user;

      const payload = {
        uid: "",
        userName: "",
        regNo: null,
        email: "",
        roles: "STUDENT",
        registered: false,
      };

      await setDoc(doc(db, "users", user.uid), {
        ...payload,
        uid: user.uid,
        userName: name,
        email,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static googleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      // console.log(userCredential);

      const user = userCredential.user;

      // Create or ensure an 'admins' document for this user (default role: 'user').
      // NOTE: we intentionally do NOT write into a generic 'users' collection here
      // because admin membership is tracked separately in the 'admins' collection.
      const adminDocRef = doc(db, "admins", user.uid);
      const adminDoc = await getDoc(adminDocRef);

      if (!adminDoc.exists()) {
        const payload = {
          uid: user.uid,
          userName: user.displayName || "",
          email: user.email || "",
          role: "user",
          createdAt: serverTimestamp(),
        };

        await setDoc(adminDocRef, payload);
      }

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export default AuthService;
