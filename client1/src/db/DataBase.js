import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, collection, getDocs, addDoc } from "./firebase";

const dbCollection = collection(db, "Codes")

export const DataBase = {
  getDocsList: async () => {
    try {
      const snapshot = await getDocs(dbCollection);
      return snapshot;
    } catch (error) {
      console.error('Error pulling docs list: ', error);
    }
  },
  addCodeBlock: async (title, code, solution) => {
    try {
      // Add document to Firestore collection
      addDoc(dbCollection, {
        title: title,
        code: code,
        solution: solution,
        mentor: 'true'// Assuming mentor is a boolean field
      });

      console.log('Code block added successfully!');
    } catch (error) {
      console.error('Error adding code block: ', error);
    }
  },
  editMentor: async (id, mentorID) => {
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
      console.error('Error edit mentor:', error);
    }
  },
  getData: async (id) => {
    try {
      const snapshot = await getDocs(dbCollection);
      const document = snapshot.docs.find(doc => doc.id === id);
      return document ? document.data() : null;
    } catch (error) {
      console.error('Error pulling data:', error);
    }

  },
  // Define a function to update a specific document
  updateData: async (id, newData) => {
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
      console.error('Error updating data:', error);
    }
  },
  getStatus: async (id, data) => {
    try {
      const snapshot = await getDocs(dbCollection);
      const document = snapshot.docs.find(doc => doc.id === id);
      return data === document.data().solution;
    } catch (error) {
      console.error('Error checking the solution:', error);
    }
  }
}


export default DataBase;