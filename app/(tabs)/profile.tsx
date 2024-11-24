import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuthContext } from '../AuthContext';

export default function ProfileScreen() {
  const { user, signIn, signUp, logOut } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert('Error signing in: ' + errorMessage);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert('Error signing up: ' + errorMessage);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert('Error signing out: ' + errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.header}>Tummi</Text>
          <Text style={styles.title}>Welcome, {user.email}!</Text>
          <Button title="Sign Out" onPress={handleSignOut} color="#787f47" />
        </>
      ) : (
        <>
          <Text style={styles.title}>Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <Button title="Sign In" onPress={handleSignIn} color="#787f47" />
            <Button title="Sign Up" onPress={handleSignUp} color="#787f47" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,  // {{ edit_2 }}
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    // add color

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});