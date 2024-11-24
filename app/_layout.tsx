import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from './AuthContext';
import { RecipeProvider } from '../context/RecipeContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'white' },
          }}
        />
      </RecipeProvider>
    </AuthProvider>
  );
}
