import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const cardWidth = width - 32; // Assuming 16 padding on each side
const imageHeight = 200; // You can adjust this value as needed

const RecipeCard = ({ recipe }: { recipe: any }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/(tabs)/(feed)/recipeDetails',
      params: { id: recipe.id }
    });
  };

    // Format the date
    const formatDate = (date: Date | string | number) => {
      const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.imageUrl }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.date}>Created: {formatDate(recipe.createdAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,  // Add this line
    borderColor: '#ddd',  // Add this line
  },
  imageContainer: {
    width: cardWidth,
    height: imageHeight,
    backgroundColor: '#f0f0f0', // Light grey background for image container
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});

export default RecipeCard;