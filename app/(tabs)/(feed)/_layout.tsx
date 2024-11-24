import { Stack } from 'expo-router';

export default function FeedLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="recipeDetails" 
        options={{ 
          headerShown: true,
          headerTitle: "Recipe Details",
          headerBackTitle: "Back"
        }} 
      />
    </Stack>
  );
}
