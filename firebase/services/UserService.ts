import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config";

type Registration = {
  email: string;
  name: string;
  whatsapp: string;
  faculty: string;
  year: string;
};

class UserService {
  /**
   * Store a registration entry in Firestore.
   * Uses a `registrations` collection so we keep signups separated from authenticated users.
   */
  static async register(payload: Registration) {
    try {
      const docRef = await addDoc(collection(db, "registrations"), {
        ...payload,
        createdAt: serverTimestamp(),
      });

      return { id: docRef.id };
    } catch (error) {
      console.error("UserService.register error:", error);
      throw error;
    }
  }
}

export default UserService;
