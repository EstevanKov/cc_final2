import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootTabParamList } from "../../types";
import * as Updates from 'expo-updates';


export function LoginView() {
  const router = useRouter(); // Hook declarado al nivel superior
  const { login } = useAuth(); // Hook declarado al nivel superior
  const navigation = useNavigation<NavigationProp<RootTabParamList>>(); // Usar el tipo adecuado

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      setSuccessMessage(result.message);
      setErrorMessage('');
  
      // Recargar la aplicación
      try {
        await Updates.reloadAsync();
      } catch (e) {
        console.error("Error recargando la aplicación:", e);
      }
    } else {
      setErrorMessage(result.message);
      setSuccessMessage('');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>INICIO DE SESIÓN</Text>
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
      </TouchableOpacity>
      {successMessage && <Text style={styles.success}>{successMessage}</Text>}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <TouchableOpacity style={styles.registerText} onPress={() => navigation.navigate('Registro')}  >
        <Text style={styles.registerLink}>¿No tienes una cuenta? Registrate</Text>
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E0FFFF"
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#000"
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
  loginButton: {
    backgroundColor: "#20B2AA",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  loginButtonText: {
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