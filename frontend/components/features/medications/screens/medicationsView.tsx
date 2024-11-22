import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from  '../../../../config/config'
const API_URL = config.API_URL;

import { router } from 'expo-router';

export const MedicationsView = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  interface User {
    id: number;
    user: string;
    email: string;
    password: string;
    createdAt: string;
  }

  interface Medication {
    id: number;
    name: string;
    quantity: number;
    user: User;
    schedules?: { id: string; start_time: string; interval_hours: number; finish_dose_time: string }[];
  }

  useEffect(() => {
  
    const fetchMedications = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const userId = await AsyncStorage.getItem('id');
        if (!token || !userId) {
          console.error('No token or user ID found');
          return;
        }

        const response = await fetch(`${API_URL}medications`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: Medication[] = await response.json();
          const userMedications = data.filter((med: Medication) => med.user.id === parseInt(userId, 10));
          setMedications(userMedications);
        } else {
          console.error('Error fetching medications', await response.json());
        }
      } catch (error) {
        console.error('Error fetching medications', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  const handleEdit = (id: number) => {
    console.log(`Editar medicamento con ID: ${id}`);
    AsyncStorage.setItem('medicationId', id.toString());
    router.push("/medications/edit");
  };
  

  const handleDelete = async (id: number) => {
   
    console.log(`Eliminar medicamento con ID: ${id}`);
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) return;

      const response = await fetch(`${API_URL}medications/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMedications((prevMedications) =>
          prevMedications.filter((medication: Medication) => medication.id !== id)
        );
        console.log('Medication deleted successfully');
      } else {
        console.error('Error deleting medication', await response.json());
      }
    } catch (error) {
      console.error('Error deleting medication', error);
    }
  };

  const renderItem = ({ item }: { item: Medication }) => (
    <View style={styles.card}>
      {item.schedules?.map((schedule) => (
        <Text key={schedule.id} style={styles.time}>
          {new Date(schedule.start_time).toLocaleTimeString()} - Intervalo: {schedule.interval_hours} horas
        </Text>
      ))}
      <Text style={styles.medicationName}>{item.name}</Text>
      <Text style={styles.doseText}>Cantidad: {item.quantity}</Text>
      <View style={styles.iconsContainer}>
  <TouchableOpacity style={styles.iconButton} onPress={() => handleEdit(item.id)}>
    <MaterialIcons name="edit" size={24} style={styles.editIcon} />
  </TouchableOpacity>
  <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
    <MaterialIcons name="delete" size={24} style={styles.deleteIcon} />
  </TouchableOpacity>
</View>

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEDICAMENTOS</Text>
      {loading ? (
        <Text>Cargando medicamentos...</Text>
      ) : (
        <FlatList
          data={medications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: '#24b5b1',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, 
  },
  time: {
    fontSize: 12,
    color: 'white',
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 4,
  },
  doseText: {
    fontSize: 14,
    color: 'white',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  iconButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
  editIcon: {
    color: '#4CAF50', 
  },
  deleteIcon: {
    color: '#F44336',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});