import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFirestore } from '../hooks/useFirestore';
import { useAuthContext } from '../app/AuthContext';

type RecipeFormProps = {
  onRecipeCreated: () => void;
};

export function RecipeForm({ onRecipeCreated }: RecipeFormProps) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const { user } = useAuthContext();
  const { createRecipe } = useFirestore();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert('You must be logged in to create a recipe');
      return;
    }

    if (!title.trim() || !ingredients.trim() || !instructions.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await createRecipe({
        title: title.trim(),
        ingredients: ingredients.split(',').map(i => i.trim()).filter(i => i !== ''),
        instructions: instructions.split(',').map(i => i.trim()).filter(i => i !== ''),
        userId: user.uid,
        createdAt: new Date(),
        imageUrl: image // This will be the local URI, we'll handle upload in the hook
      });
      alert('Recipe created successfully!');
      setTitle('');
      setIngredients('');
      setInstructions('');
      setImage(null);
      onRecipeCreated();
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Error creating recipe: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Recipe Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter recipe title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Ingredients (comma separated)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />
      <Text style={styles.label}>Instructions (comma separated)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter instructions"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} color="#787f47" />
      <View style={styles.spacing} />
      <Button title="Create Recipe" onPress={handleSubmit} color="#787f47" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  spacing: {
    height: 16, // Adjust this value for more or less space
  },
});