import React, { createContext, useState } from 'react';
import { Recipe } from '../types/types';

export const RecipeContext = createContext<{
  recipes: Recipe[];
  addRecipe: (newRecipe: Recipe) => void;
}>({
  recipes: [],
  addRecipe: () => {},
});

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const addRecipe = (newRecipe: Recipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
