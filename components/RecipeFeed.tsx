import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useFirestore } from '../hooks/useFirestore';
import { useAuthContext } from '../app/AuthContext';
import { FlatList, RefreshControl, View, Text, StyleSheet } from 'react-native';
import RecipeCard from './RecipeCard';

export function Feed() {
  const { user } = useAuthContext();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { getUserRecipes } = useFirestore();
  const isFocused = useIsFocused();
  const loadingRef = useRef(false);

  const loadRecipes = useCallback(async () => {
    if (user?.uid && isFocused && !loadingRef.current) {
      loadingRef.current = true;
      try {
        console.log('Fetching recipes for user:', user.uid);
        const fetchedRecipes = await getUserRecipes(user.uid);
        console.log('Fetched recipes count:', fetchedRecipes.length);
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setRefreshing(false);
        loadingRef.current = false;
      }
    }
  }, [user, getUserRecipes, isFocused]);

  useEffect(() => {
    if (isFocused) {
      loadRecipes();
    }
  }, [isFocused, loadRecipes]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadRecipes();
  }, [loadRecipes]);

  console.log('Rendering Feed, recipes count:', recipes.length);

  if (recipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No recipes found. Add some recipes to get started!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      renderItem={({ item }) => <RecipeCard recipe={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

