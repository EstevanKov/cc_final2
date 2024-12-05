import React from "react";
import { CreateMedicationsView } from "../../components/features/medications/screens/createMedicationView";
import NotificationComponent from "@/components/features/notifications/aplications/screens/notification";

export default function CreateMedicationsScreen() {
    return (
        <>
            <CreateMedicationsView />
            <NotificationComponent />
        </>
    );
}
