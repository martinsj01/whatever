// User-related types
export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  // Recipe-related types
  export interface Recipe {
    id: string;
    title: string;
    description: string;
    ingredients: Ingredient[];
    instructions: string[];
    author: User;
    createdAt: Date;
    updatedAt: Date;
    notes: string;
  }
  
  export interface Ingredient {
    name: string;
    amount: number;
    unit: string;
  }
  
  // Interaction types
  export interface Comment {
    id: string;
    text: string;
    author: User;
    createdAt: Date;
  }
  
  export interface Rating {
    userId: string;
    recipeId: string;
    value: number;
  }
  
  // Navigation types
  export type RootStackParamList = {
    feed: { newRecipe?: Recipe };
    create: undefined;
    recipeDetails: { recipeId: string };
    profile: { userId: string };
  }