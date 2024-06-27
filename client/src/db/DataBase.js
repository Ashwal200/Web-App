import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, collection, getDocs, addDoc } from "./firebase";

// Firestore collection reference
const dbCollection = collection(db, "Codes");

// Database operations object
export const DataBase = {
  // Function to fetch all documents from Firestore collection
  getDocsList: async () => {
    try {
      const snapshot = await getDocs(dbCollection);
      return snapshot;
    } catch (error) {
      console.error('Error pulling docs list: ', error);
    }
  },

  // Function to add a new code block to Firestore
  addCodeBlock: async (title, code, solution) => {
    try {
      // Add document to Firestore collection
      await addDoc(dbCollection, {
        title: title,
        code: code,
        solution: solution,
        mentor: 'true'
      });
      console.log('Code block added successfully!');
    } catch (error) {
      console.error('Error adding code block: ', error);
    }
  },

  // Function to edit mentor status of a code block in Firestore
  editMentor: async (id) => {
    try {
      const docRef = doc(db, "Codes", id); // Reference to Firestore document
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        throw new Error(`Document with ID ${id} does not exist`);
      }

      // Update mentor to false
      await setDoc(docRef, {
        mentor: 'false',
      }, { merge: true });
      console.log('Document updated successfully!');
    } catch (error) {
      console.error('Error editing mentor:', error);
    }
  },

  // Function to fetch data of a specific code block from Firestore
  getData: async (id) => {
    try {
      // Retrieve documents from Firestore
      const snapshot = await getDocs(dbCollection);
      // Find document by ID
      const document = snapshot.docs.find(doc => doc.id === id);
      return document ? document.data() : null;
    } catch (error) {
      console.error('Error pulling data:', error);
    }
  },

  // Function to update code of a specific code block in Firestore
  updateData: async (id, newData) => {
    try {
      // Reference to Firestore document
      const docRef = doc(db, "Codes", id);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        throw new Error(`Document with ID ${id} does not exist`);
      }

      // Update document with new code data
      await setDoc(docRef, { code: newData }, { merge: true });
      console.log('Document updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  },

  // Function to check if provided solution matches expected solution in Firestore
  getStatus: async (id, data) => {
    try {
      const snapshot = await getDocs(dbCollection); // Retrieve documents from Firestore
      const document = snapshot.docs.find(doc => doc.id === id); // Find document by ID

      if (!document || !document.data() || !document.data().solution) {
        throw new Error(`Document with ID ${id} does not exist or solution is missing.`);
      }
      // Remove comments (single-line and multi-line)
      const cleanedSolution = document.data().solution.replace(/\/\/.*|\/\*[^]*?\*\//g, '');

      // Normalize whitespace (replace multiple spaces with single space)
      const normalizedSolution = cleanedSolution.replace(/\s+/g, ' ').trim();

      const cleanedData = data.replace(/\/\/.*|\/\*[^]*?\*\//g, '');

      const normalizedData = cleanedData.replace(/\s+/g, ' ').trim();

      return normalizedData === normalizedSolution;

    } catch (error) {
      console.error('Error checking the solution:', error);
    }
  }
};

export default DataBase; 
