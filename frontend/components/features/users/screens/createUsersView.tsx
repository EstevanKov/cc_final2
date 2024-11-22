<script src="http://localhost:8081"></script>
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useCreateUser } from '../applications/useCreateUser'; 

export const CreateUsersView = () => {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    errorMessage, successMessage,
    handleCreateUser,
  } = useCreateUser();

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRO</Text>
      <Text style={styles.subtitle}>Date de alta llenando los siguientes datos.</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#a0a0a0"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#a0a0a0"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#a0a0a0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.createButton} onPress={handleCreateUser}>
        <Text style={styles.createButtonText}>CREAR CUENTA</Text>
      </TouchableOpacity>

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      {successMessage && <Text style={styles.success}>{successMessage}</Text>}

      <Link href="/auth/login">
        <Text style={styles.loginText}>
          ¿Ya tienes una cuenta? <Text style={styles.loginLink}>Inicia Sesión</Text>
        </Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: "#fff",
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 4, 
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#00CED1", 
    padding: 12, 
    marginVertical: 8, 
    borderRadius: 8, 
    backgroundColor: "#fff",
    color: "#000",
  },
  createButton: {
    backgroundColor: "#20B2AA",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: { 
    color: 'red', 
    marginTop: 8, 
    textAlign: "center" 
  },
  success: { 
    color: 'blue', 
    marginTop: 8, 
    textAlign: "center" 
  },
  loginText: {
    textAlign: "center",
    marginTop: 16,
    color: "#000",
  },
  loginLink: {
    fontWeight: "bold",
    color: "#20B2AA",
  },
});