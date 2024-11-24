import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === '(feed)') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen 
        name="(feed)" 
        options={{ 
          title: 'Feed',
          headerShown: false 
        }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{ 
          title: 'Create Recipe',
          headerShown: false 
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          headerShown: false 
        }} 
      />
    </Tabs>
  );
}