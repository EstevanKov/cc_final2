/*import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AuthProvider } from '../components/features/auth/providers/AuthProvider';
import { CreateMedicationsProvider } from '../components/features/medications/providers/CreateMedicationProvider';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
<AuthProvider>
  <CreateMedicationsProvider>
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" options={{ headerShown: true }} />
      </Stack>
    </ThemeProvider>
    </CreateMedicationsProvider>
    </AuthProvider>

  );
}
*/

import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

//Auth
import LoginScreen from './auth/login';

//Users
import CreateUsersScreen from './users/register';
import UsersScreen from './users/loged';
import EditUsersScreen from './users/edit';
import DeletetUsersScreen from './users/delete';
//medications
import CreateMedicationsScreen from './medications/create';
import MedicationsScreen from './medications/index';
import { EditMedicationsView } from '@/components/features/medications/screens/editMeditacionsView'; 


async function requestPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Se requieren permisos para enviar notificaciones.');
      return;
    }
  }
}
requestPermissions();

import { LoginView } from '@/components/features/auth/screens/loginView';
import { AuthProvider } from '@/components/features/auth/providers/AuthProvider';
import { CreateMedicationsProvider } from '@/components/features/medications/providers/CreateMedicationProvider';
import { LoadingScreen } from '@/components/features/auth/screens/loadingScreen';

const Tab = createBottomTabNavigator();

const getIconName = (routeName: string): keyof typeof Ionicons.glyphMap => {
  switch (routeName) {
    case 'Medicamentos':
      return 'heart';
    case 'Nuevo':
      return 'medkit';
    case 'Perfil':
      return 'id-card';


    case 'Login':
      return 'body';
    case 'Registro':
      return 'person';
    default:
      return 'home';
  }
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await AsyncStorage.getItem('access_token');
      setIsAuthenticated(!!token);
      setLoading(false); // Deja de cargar una vez que se verifica la autenticación.
    };

    initializeAuth();
  }, []);

  if (loading) {
    // Muestra un componente de carga mientras verificas el estado.
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <CreateMedicationsProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={getIconName(route.name)} size={size} color={color} />
              ),
              tabBarActiveTintColor: '#2196F3',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            {isAuthenticated ? (
              <>
                <Tab.Screen name="Perfil" component={UsersScreen} />
                <Tab.Screen name="Medicamentos" component={MedicationsScreen} />
                <Tab.Screen name="Nuevo" component={CreateMedicationsScreen} />
              </>
            ) : (
              <><Tab.Screen name="Login" component={LoginView} />
                <Tab.Screen name="Registro" component={CreateUsersScreen} /></>
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </CreateMedicationsProvider>
    </AuthProvider>
  );
}

function Loading() {
  return (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <h1>Cargando...</h1>
    </div>

  );
}  
