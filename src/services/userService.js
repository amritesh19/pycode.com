import { db } from "../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "users");

class UserService {
  addDate = (newDate) => {
    return addDoc(userCollectionRef, newDate);
  };

  updateDate = (id, updatedDate) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, updatedDate);
  };

  deleteDate = (id) => {
    const userDoc = doc(db, "users", id);
    return deleteDoc(userDoc);
  };

  getAllDates = () => {
    return getDocs(userCollectionRef);
  };

  getDate = (id) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  };
}

export default new UserService();