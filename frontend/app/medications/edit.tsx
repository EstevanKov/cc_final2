import { EditMedicationsView } from "@/components/features/medications/screens/editMeditacionsView";

import { useNavigation } from '@react-navigation/native';
import React from "react";

export default function EditMedicationsScreen() {
  const navigation = useNavigation(); // Esto obtiene la navegación de react-navigation

  return <EditMedicationsView navigation={navigation} />;
}
