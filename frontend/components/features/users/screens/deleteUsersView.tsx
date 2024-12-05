import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import axios, { AxiosError } from "axios";
import { useRouter } from "expo-router";
import {config} from  '../../../../config/config'
const API_URL = config.API_URL;
import Loginstorage from "../../storage";
import RNRestart from 'react-native-restart';

//import AsyncStorage from "@react-native-async-storage/async-storage";

export const DeleteUserView = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleDeleteUser = async () => {
    setErrorMessage("");

    if (!currentPassword) {
      setErrorMessage("Por favor ingresa la contraseña actual para confirmar.");
      return;
    }

    const token = await Loginstorage.getItem("access_token");
    const id = await Loginstorage.getItem("id");

    if (token && id) {
      try {
        /*/ Eliminar schedules asociados al usuario
        await axios.delete(`${BACKEND_URL}/users/${id}/shedules`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Eliminar medications asociados al usuario
        await axios.delete(`${BACKEND_URL}/users/${id}/medications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Eliminar usuario*/
        await axios.delete(`${API_URL}users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { currentPassword },
        });

        await Loginstorage.removeItem("access_token");
        await Loginstorage.removeItem("refresh_token");
        await Loginstorage.removeItem("id");
           RNRestart.Restart();//window.location.reload();

        //router.push("/auth/login");
      } catch (error: unknown) {

        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message || "Hubo un problema al eliminar la cuenta.");
        } else {
          setErrorMessage("Ocurrió un error inesperado.");
        }
      }
    } else {
      setErrorMessage("No se pudo autenticar al usuario.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar Cuenta</Text>
      
      <Text style={styles.subtitle}>Ingrese su contraseña actual para confirmar eliminación</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña Actual"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleDeleteUser}>
        <Text style={styles.buttonText}>Eliminar Cuenta</Text>
      </TouchableOpacity>
      
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
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
});