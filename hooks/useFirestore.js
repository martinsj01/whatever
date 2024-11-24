import { db, storage } from '../firebase';
import { collection, addDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export function useFirestore() {
  const createRecipe = async (recipeData) => {
    try {
      let imageUrl = null;
      if (recipeData.imageUrl) {
        const response = await fetch(recipeData.imageUrl);
        const blob = await response.blob();
        const imageRef = ref(storage, `recipes/${Date.now()}`);
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }

      const docRef = await addDoc(collection(db, "recipes"), {
        ...recipeData,
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw error;
    }
  };

  const getUserRecipes = async (userId) => {
    try {
      console.log("Getting recipes for user:", userId);
      if (!userId) {
        console.warn("No userId provided to getUserRecipes");
        return [];
      }
      const recipesRef = collection(db, 'recipes');
      const q = query(
        recipesRef,
        where('userId', '==', userId)
      );
      console.log("Query created");
      const querySnapshot = await getDocs(q);
      console.log("Query executed, number of docs:", querySnapshot.size);
      const recipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Mapped recipes:", recipes);
      return recipes;
    } catch (error) {
      console.error("Error in getUserRecipes:", error);
      throw error;
    }
  };

  const getRecipeById = async (id) => {
    try {
      const recipeRef = doc(db, 'recipes', id);
      const recipeDoc = await getDoc(recipeRef);
      if (recipeDoc.exists()) {
        return { id: recipeDoc.id, ...recipeDoc.data() };
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting recipe by id:", error);
      throw error;
    }
  };

  return { createRecipe, getUserRecipes, getRecipeById };
}
