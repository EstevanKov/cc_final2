import { Stack } from "expo-router";

export default function UsersLayout(){


    return(
        <Stack>
            <Stack.Screen name="loged" options={{
                title:"Perfil"
            }}/>
            <Stack.Screen name="register" options={{
                title:"Registrar usuario"
            }}/>
            <Stack.Screen name="edit" options={{
                title:"Editar usuario"
            }}/>
            <Stack.Screen name="delete" options={{
                title:"Eliminar usuario"
            }}/>
        </Stack>
    );
}