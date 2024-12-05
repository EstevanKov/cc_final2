import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Usar useNavigation de React Navigation
import { NavigationProp } from '@react-navigation/native';
import { RootTabParamList } from "../../types"; // Asegúrate de que RootTabParamList esté bien configurado
import { useCreateUser } from '../applications/useCreateUser'; // Suponiendo que tienes este hook para manejar la creación de usuarios

export const CreateUsersView = () => {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>(); // Usar el tipo adecuado para la navegación
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    errorMessage, successMessage,
    handleCreateUser,
  } = useCreateUser();
  

  const handleSubmit = async () => {
    const result = await handleCreateUser();
    console.log(result); // Los mensajes ya se manejan dentro del hook
  };
  
  
  

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
      
      <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
        <Text style={styles.createButtonText}>CREAR CUENTA</Text>
      </TouchableOpacity>

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      {successMessage && <Text style={styles.success}>{successMessage}</Text>}

      <TouchableOpacity style={styles.registerText} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerLink}>¿Ya tienes una cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
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
  registerText: {
    textAlign: "center",
    marginTop: 16,
    color: "#000",
  },
  registerLink: {
    fontWeight: "bold",
    color: "#20B2AA",
  },
});
