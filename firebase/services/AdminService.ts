import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";

export type RegistrationRecord = {
  id: string;
  email?: string;
  name?: string;
  whatsapp?: string;
  faculty?: string;
  year?: string;
  createdAt?: unknown;
  is_arrived?: boolean;
  arrivedAt?: unknown;
};

class AdminService {
  /**
   * Subscribe to registrations collection. Returns unsubscribe function.
   */
  static listenRegistrations(cb: (items: RegistrationRecord[]) => void) {
    const q = query(
      collection(db, "registrations"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const items: RegistrationRecord[] = snap.docs.map(
        (d) =>
          ({
            id: d.id,
            ...(d.data() as unknown as Partial<RegistrationRecord>),
          } as RegistrationRecord)
      );
      cb(items);
    });

    return unsub;
  }

  /**
   * Update arrival flag for a registration document.
   */
  static async setArrival(id: string, arrived: boolean) {
    const ref = doc(db, "registrations", id);
    if (arrived) {
      await updateDoc(ref, { is_arrived: true, arrivedAt: serverTimestamp() });
    } else {
      await updateDoc(ref, { is_arrived: false, arrivedAt: null });
    }
  }
}

export default AdminService;
