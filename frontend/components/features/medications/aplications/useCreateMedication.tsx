import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCreateMedications as useCreateMedicationsContext } from "../providers/CreateMedicationProvider";

export function useCreateMedications() {
  const [name, setName] = useState("");
  const [pillCount, setPillCount] = useState(1);
  const [intervalHours, setIntervalHours] = useState(1);
  const [endDate, setEndDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState("");

  const { addMedication } = useCreateMedicationsContext();

  useEffect(() => {
    calculateEndDate();
  }, [pillCount, intervalHours]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const calculateEndDate = () => {
    const currentDate = new Date();
    const intervalInMilliseconds = intervalHours * 3600 * 1000;
    const totalTime = pillCount * intervalInMilliseconds;  // Ahora tomamos todas las pastillas
    const calculatedEndDate = new Date(currentDate.getTime() + totalTime);
    
    // Imprimir todas las fechas de las tomas de pastillas
    console.log(`Recordatorio para ${name}:`);
    for (let i = 0; i < pillCount; i++) {
      const pillTime = new Date(currentDate.getTime() + i * intervalInMilliseconds);
      const pillTimeFormatted = pillTime.toLocaleString();
      console.log(`Toma ${i + 1}: ${pillTimeFormatted} - Debes tomar ${name}`);
    }
  
    setEndDate(calculatedEndDate);
  };
  

  const handleAddMedication = async () => {
    const token = await AsyncStorage.getItem("access_token");
    const id = await AsyncStorage.getItem("id");

    if (!token || !id) {
      setSuccessMessage("Usuario no autenticado.");
      return;
    }

    const medicamentoData = {
      name,
      quantity: pillCount,
      intervalo: intervalHours,
      finish_time: endDate.toISOString(),
      user: id,
    };

    const success = await addMedication(medicamentoData, token);
    if (success) {
      setSuccessMessage("Medicamento añadido exitosamente");
      setName("");
      setPillCount(1);
      setIntervalHours(1);
      setEndDate(new Date());
    }
  };

  return {
    name,
    setName,
    pillCount,
    setPillCount,
    intervalHours,
    setIntervalHours,
    endDate,
    successMessage,
    handleAddMedication,
  };
}
