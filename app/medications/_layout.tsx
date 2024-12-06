import { Stack } from "expo-router";
import React from "react";

export default function MedicationsLayout(){


    return(
        <Stack>
            <Stack.Screen name="index" options={{
                title:"Medicamentos"
            }}/>
            <Stack.Screen name="create" options={{
                title:"Registrar medicinas"
            }}/>
            <Stack.Screen name="edit" options={{
                title:"Editar medicinas"
            }}/>
        </Stack>
    );
}