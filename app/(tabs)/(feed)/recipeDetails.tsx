import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useFirestore } from '../../../hooks/useFirestore';
import RecipeCard from '../../../components/RecipeCard';

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
}

export default function RecipeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { getRecipeById } = useFirestore();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        try {
          const fetchedRecipe = await getRecipeById(id);
          setRecipe(fetchedRecipe as Recipe | null);
        } catch (error) {
          console.error('Error fetching recipe:', error);
          setRecipe(null);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <RecipeCard recipe={recipe} />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>• {ingredient}</Text>
        ))}
        <Text style={styles.sectionTitle}>Instructions:</Text>
        {recipe.instructions.map((instruction, index) => (
          <Text key={index} style={styles.instruction}>{index + 1}. {instruction}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 4,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 8,
  },
});