import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { RecipeForm } from '../../components/CreateRecipe';

export default function CreateScreen() {
  const handleRecipeCreated = () => {
    router.replace('/(tabs)/(feed)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/images/cooking-background.jpg')} // Make sure to add this image to your assets folder
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent']}
          style={styles.gradient}
        >
          <Text style={styles.title}>Create New Recipe</Text>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.container}>
        <Text style={styles.instructions}>Fill in the details below to create your recipe:</Text>
        <RecipeForm onRecipeCreated={handleRecipeCreated} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    height: 200,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
});