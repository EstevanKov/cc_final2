import { useState, useEffect } from "react"; 
import { useCreateMedications as useCreateMedicationsContext } from "../providers/CreateMedicationProvider";
import { storage } from "../../utils";

export function useCreateMedications() {
  // Estado para almacenar los datos del medicamento y horarios
  const [name, setName] = useState("");
  const [pillCount, setPillCount] = useState(1);
  const [intervalHours, setIntervalHours] = useState(1);
  const [endDate, setEndDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState("");
  const [schedules, setSchedules] = useState<Date[]>([]);  // Arreglo para almacenar las fechas de las tomas

  const { addMedication } = useCreateMedicationsContext();

  // Recalcular las fechas de las tomas cuando cambia la cantidad de pastillas o el intervalo
  useEffect(() => {
    calculateEndDate();
  }, [pillCount, intervalHours]);

  // Limpiar el mensaje de éxito después de 3 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Función para calcular la fecha de finalización y los horarios de las tomas
  const calculateEndDate = () => {
    const currentDate = new Date();
    const intervalInMilliseconds = intervalHours * 3600 * 1000;
    const totalTime = pillCount * intervalInMilliseconds; // Calculamos el total de tiempo para todas las pastillas
    const calculatedEndDate = new Date(currentDate.getTime() + totalTime);
    
    
    // Generar todas las fechas de toma de medicamentos
    const newSchedules = [];
    for (let i = 0; i < pillCount; i++) {
      const pillTime = new Date(currentDate.getTime() + i * intervalInMilliseconds);
      newSchedules.push(pillTime);
      //console.log(`Toma ${i + 1}: ${pillTime.toLocaleString()} - Debes tomar ${name}`);
      
      // Programar notificaciones para cada toma (si decides seguir usando esto)
    
    }

    setSchedules(newSchedules);
    setEndDate(calculatedEndDate);
  };

  const handleAddMedication = async () => {
    // Obtener el token y el ID del usuario desde el almacenamiento local
    const token = await storage.getItem("access_token");
    const id = await storage.getItem("id");
  
    // Verificar si el usuario está autenticado
    if (!token || !id) {
      setSuccessMessage("Usuario no autenticado.");
      return;
    }
  
    // Crear las notificaciones
    const notifications = schedules.map((schedule) => ({
      sentAt: schedule,  // Hora de la toma del medicamento
      message: `Es hora de tomar ${name}`,  // Mensaje de la notificación
    }));
  
    // Preparar los datos del medicamento, incluidos los horarios de toma
    const medicamentoData = {
      name,
      quantity: pillCount,
      intervalo: intervalHours,
      finish_time: endDate.toISOString(),
      schedules: schedules.map((schedule) => schedule.toISOString()),  // Convertir las fechas a ISO String para enviarlas
      notifications,  // Enviar las notificaciones correctamente
      user: id,
    };
    console.log('Medicamento Data:', medicamentoData);  // Verifica la estructura de los datos
  
    // Llamar a la función del contexto para agregar el medicamento
    const success = await addMedication(medicamentoData, token);
    if (success) {
      // Mostrar mensaje de éxito y limpiar los campos
      setSuccessMessage("Medicamento añadido exitosamente");
      setName("");
      setPillCount(1);
      setIntervalHours(1);
      setEndDate(new Date());
      setSchedules([]);  // Limpiar los horarios
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
