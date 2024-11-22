import React, { createContext, useContext } from "react";
import { config } from "../../../../config/config";

const API_URL = config.API_URL;

const CreateMedicationsContext = createContext<any>(null);

export const useCreateMedications = () => {
  const context = useContext(CreateMedicationsContext);
  if (!context) {
    throw new Error("useCreateMedications debe usarse dentro de un CreateMedicationsProvider");
  }
  return context;
};

export const CreateMedicationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const addMedication = async (medicationData: any, token: any) => {
    try {
      const response = await fetch(`${API_URL}medications/addWithSchedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(medicationData),
      });

      if (response.ok) {
        return true;
      } else {
        console.error("Error al añadir el medicamento", await response.json());
        return false;
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
      return false;
    }
  };

  return (
    <CreateMedicationsContext.Provider value={{ addMedication }}>
      {children}
    </CreateMedicationsContext.Provider>
  );
};
