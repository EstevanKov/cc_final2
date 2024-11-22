import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useCreateMedications } from "../aplications/useCreateMedication";

export function CreateMedicationsView() {
  const {
    name,
    setName,
    pillCount,
    setPillCount,
    intervalHours,
    setIntervalHours,
    endDate,
    successMessage,
    handleAddMedication,
  } = useCreateMedications();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AÑADIR MEDICAMENTOS</Text>

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
        <Text style={styles.dateText}>{endDate.toLocaleString()}</Text>

        {successMessage ? (
          <Text style={styles.successMessage}>{successMessage}</Text>
        ) : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddMedication}>
            <Text style={styles.buttonText}>Agregar Medicamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
    paddingTop: 40,
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
    backgroundColor: '#00E3DB',
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00E3DB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#00E3DB',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#00E3DB',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateText: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: 'bold',
    color: '#000',
  },
});