import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

export const saveUserRun = async (uid, runData) => {
  if (!uid) throw new Error("User not authenticated");

  await addDoc(collection(db, "users", uid, "runs"), {
    ...runData,
    createdAt: serverTimestamp(),
  });
};

export const getRecentUserRuns = async (uid, maxRuns = 5) => {
  if (!uid) return [];

  const runsRef = collection(db, "users", uid, "runs");
  const runsQuery = query(runsRef, orderBy("createdAt", "desc"), limit(maxRuns));
  const snapshot = await getDocs(runsQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};