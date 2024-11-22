import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from  '../../../../config/config'
const API_URL = config.API_URL;


export function EditMedicationsView({ navigation }: { navigation: any }) {
  const [medicationId, setMedicationId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [pillCount, setPillCount] = useState(1);
  const [intervalHours, setIntervalHours] = useState(1);
  const [endDate, setEndDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMedicationId = async () => {
      try {
        const storedMedicationId = await AsyncStorage.getItem('medicationId');
        if (storedMedicationId) {
          setMedicationId(storedMedicationId);
        }
      } catch (error) {
        console.error('Error al obtener el id del medicamento desde AsyncStorage', error);
      }
    };
    loadMedicationId();
  }, []);

  useEffect(() => {
    if (medicationId) {
      fetchMedicationDetails();
    }
  }, [medicationId]);

  const fetchMedicationDetails = async () => {
   
    const token = await AsyncStorage.getItem('access_token');
    const response = await fetch(`${API_URL}/medications/${medicationId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const medicationData = await response.json();
      setName(medicationData.name);
      setPillCount(medicationData.quantity);
      setIntervalHours(medicationData.intervalo);
      setEndDate(new Date(medicationData.finish_time));

      if (isNaN(new Date(medicationData.finish_time).getTime())) {
        console.error('Fecha de término inválida recibida del backend');
        setEndDate(new Date());
      }
    } else {
      console.error('Error al cargar los detalles del medicamento');
    }
  };

  const handleEditMedication = async () => {
    if (loading) return;
    setLoading(true);

    const token = await AsyncStorage.getItem('access_token');
    const userId = await AsyncStorage.getItem('id');

    if (isNaN(endDate.getTime())) {
      console.error('Fecha de término inválida', endDate);
      setSuccessMessage('Error en la fecha de término');
      setLoading(false);
      return;
    }

    const updatedMedicationData = {
      name,
      quantity: pillCount,
      intervalo: intervalHours,
      finish_time: endDate.toISOString(),
      user: userId,
    };
    

    try {
      const response = await fetch(`${API_URL}/medications/editWithSchedule/${medicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedMedicationData),
      });

      if (response.ok) {
        setSuccessMessage('Medicamento editado exitosamente');
        setTimeout(() => {
          setSuccessMessage('');
          navigation.goBack();
        }, 2000);
      } else {
        console.error('Error al editar el medicamento', await response.json());
        setSuccessMessage('Error al editar el medicamento');
        setTimeout(() => setSuccessMessage(''), 2000);
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
      setSuccessMessage('Error en la solicitud');
      setTimeout(() => setSuccessMessage(''), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>EDITAR MEDICAMENTO</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del medicamento"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Cantidad de pastillas</Text>
        <Picker
          selectedValue={pillCount}
          style={styles.input}
          onValueChange={(itemValue) => setPillCount(Number(itemValue))}
        >
          {[...Array(30).keys()].map((i) => (
            <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
          ))}
        </Picker>

        <Text style={styles.label}>Intervalo (Horas)</Text>
        <Picker
          selectedValue={intervalHours}
          style={styles.input}
          onValueChange={(itemValue) => setIntervalHours(Number(itemValue))}
        >
          {[...Array(24).keys()].map((i) => (
            <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
          ))}
        </Picker>

        <Text style={styles.label}>Fecha de término calculada</Text>
        <Text style={styles.dateText}>
          {endDate.toLocaleString()}
        </Text>

        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEditMedication}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#0ff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00ffcc',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#00ffcc',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginVertical: 8,
    fontWeight: 'bold',
  },
});
