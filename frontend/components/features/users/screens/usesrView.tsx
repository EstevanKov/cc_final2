import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import {config} from  '../../../../config/config'
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = config.API_URL;


interface User {
  user: string;
  email: string;
}

export const UsersView = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('access_token');
      const id = await AsyncStorage.getItem('id');
  
      if (token && id) {
        try {
         // const response = await axios.get('https://0d8f-189-165-203-144.ngrok-free.app/users/1',{
          const response = await axios.get(`${API_URL}users/${id}`, {
            method:"GET",
            headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    };
  
    fetchUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id");
    localStorage.removeItem("refresh_token");
    router.push( "/auth/login");
  };

  const edit = () => {
    router.push( "/users/edit");
  };

  const deleteU = () =>{
    router.push( "/users/delete");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground} />

      <View style={styles.profileContainer}>
        <Image
          source={require("../../../../assets/images/logo.png")}
          style={styles.logo}
        />

        {user ? (
          <>
            <Text style={styles.appName}>Capsule Care</Text>
            <Text style={styles.userName}>{user.user}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </>
        ) : (
          <Text>Cargando información del usuario...</Text>
        )}

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={edit}>
            <MaterialIcons name="email" size={24} color="#00CED1" />
            <Text style={styles.optionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={deleteU}>
            <MaterialIcons name="notifications" size={24} color="#00CED1" />
            <Text style={styles.optionText}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' },
  headerBackground: {
    backgroundColor: '#00E3DB',
    width: '100%',
    height: '20%',
    position: 'absolute',
    top: 0,
  },
  profileContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: '25%',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00E3DB',
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  optionsContainer: {
    width: '100%',
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00E3DB',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#00E3DB',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

