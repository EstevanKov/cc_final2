import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { config } from "../../../../config/config";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import Loginstorage from "../../storage";
const API_URL = config.API_URL;
import RNRestart from 'react-native-restart';

// Define un tipo para el usuario
interface User {
  user: string;
  email: string;
}

// EditUserView componente
export const EditUserView = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await Loginstorage.getItem("access_token");
      const id = await Loginstorage.getItem("id");
      if (token) {
        try {
          const response = await axios.get(`${API_URL}users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setName(response.data.user);
          setEmail(response.data.email);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateUser = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    const token = await Loginstorage.getItem("access_token");
    const id = await Loginstorage.getItem("id");

    if (!currentPassword) {
      setErrorMessage("Por favor ingresa la contraseña actual para confirmar.");
      return;
    }

    // Verifica si `user` es no nulo antes de acceder a sus propiedades
    if (user) {
      const updatedData: Partial<User> & { newPassword?: string } = {};
      if (name !== user.user) updatedData.user = name;
      if (email !== user.email) updatedData.email = email;
      if (password) updatedData.newPassword = password;

      try {
        const response = await axios.patch(
          `${API_URL}users/${id}`,
          { ...updatedData, currentPassword },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuccessMessage("Datos actualizados con éxito.");
        setTimeout(() => {
             RNRestart.Restart();//window.location.reload();
        }, 2000);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Manejo específico para errores de Axios
          setErrorMessage(error.response?.data?.message || "Hubo un problema al actualizar los datos.");
        } else {
          // Manejo genérico para otros tipos de errores
          setErrorMessage("Ocurrió un error inesperado.");
        }
        setSuccessMessage("");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.subtitle}>Ingrese su contraseña actual para confirmar cambios</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña Actual"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
        <Text style={styles.buttonText}>Actualizar Datos</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#00E7F3',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 8,
  },
  button: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#00D1A0',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
  success: {
    color: 'blue',
    marginTop: 8,
    textAlign: 'center',
  },
});