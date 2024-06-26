import { setDoc , doc , getDoc } from "firebase/firestore";
import { db, collection, getDocs, addDoc } from "./firebase";

const dbCollection = collection(db, "Codes")

export const DataBase = {
  getDocsList: async () => {
    const snapshot = await getDocs(dbCollection);
    return snapshot;
  },
  addCodeBlock: async (title, code) => {
    await addDoc(dbCollection, { title, code });
  },
  addMentor: async (id , mentorID) => {
    try {
      const docRef = doc(db, "Codes", id);
      const docSnapshot = await getDoc(docRef);
      
      if (!docSnapshot.exists()) {
        throw new Error(`Document with ID ${id} does not exist`);
      }
  
      // Update the document with the new data
      await setDoc(docRef, { 
        title: docSnapshot.data().title, 
        code: docSnapshot.data().code,
        mentor: mentorID,
        }, { merge: true });
      console.log('Document updated successfully!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  },
  getCode: async (id) => {
    const snapshot = await getDocs(dbCollection);
    const document = snapshot.docs.find(doc => doc.id === id);
    return document ? document.data() : null;
  },
  // Define a function to update a specific document
  updateDocument: async (id, newData) => {
    try {
      const docRef = doc(db, "Codes", id);
      const docSnapshot = await getDoc(docRef);
      
      if (!docSnapshot.exists()) {
        throw new Error(`Document with ID ${id} does not exist`);
      }
  
      // Update the document with the new data
      await setDoc(docRef, { title: docSnapshot.data().title, code: newData }, { merge: true });
      console.log('Document updated successfully!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }
}


export default DataBase;