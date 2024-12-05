import React from "react";
import { MedicationsView } from "../../components/features/medications/screens/medicationsView";
import NotificationComponent from "@/components/features/notifications/aplications/screens/notification";

export default function MedicationsScreen(){

    return( 
        <>
    <MedicationsView/>
    <NotificationComponent/>
    </>
)
}