import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';

// Auth
import { LoginView } from '@/components/features/auth/screens/loginView';
import { AuthProvider } from '@/components/features/auth/providers/AuthProvider';
import { LoadingScreen } from '@/components/features/auth/screens/loadingScreen';

// Users
import CreateUsersScreen from './users/register';
import UsersScreen from './users/loged';
import EditUsersScreen from './users/edit';
import DeletetUsersScreen from './users/delete';

// Medications
import { CreateMedicationsProvider } from '@/components/features/medications/providers/CreateMedicationProvider';
import CreateMedicationsScreen from './medications/create';
import MedicationsScreen from './medications/index';
import EditMedicationsScreen from './medications/edit';

// Notifications
import NotificationComponent from '@/components/features/notifications/aplications/screens/notification';
import { View, ActivityIndicator } from 'react-native';


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
    case 'Eliminar Usuario':
      return 'person-remove';
      case 'Editar Medicina':
        return 'fitness';
    default:
      return 'home';
  }
};



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Error fetching token:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (loading) {
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
                <Tab.Screen name="Medicamentos" component={MedicationsScreen} />
                <Tab.Screen name="Nuevo" component={CreateMedicationsScreen} />
                <Tab.Screen name="Perfil" component={UsersScreen} />


                {/* Tabs ocultas pero sin visualización */}
                <Tab.Screen 
                  name="EditarUsuario" 
                  component={EditUsersScreen} 
                  options={{ tabBarButton: () => null }} 
                />
                <Tab.Screen 
                  name="EliminarUsuario" 
                  component={DeletetUsersScreen} 
                  options={{ tabBarButton: () => null }} 
                />
                <Tab.Screen 
                  name="EditarMedicina" 
                  component={EditMedicationsScreen} 
                  options={{ tabBarButton: () => null }} 
                />
                <Tab.Screen 
                  name="Login" 
                  component={LoginView} 
                  options={{ tabBarButton: () => null }} 
                />
                <Tab.Screen 
                  name="Registro" 
                  component={CreateUsersScreen} 
                  options={{ tabBarButton: () => null }} 
                />
              </>
            ) : (
              <>
                <Tab.Screen name="Login" component={LoginView} />
                <Tab.Screen name="Registro" component={CreateUsersScreen} />

                {/* Tabs ocultas pero sin visualización */}
                <Tab.Screen 
                  name="Perfil" 
                  component={UsersScreen} 
                  options={{ tabBarButton: () => null }} 
                />
                <Tab.Screen 
                  name="Medicamentos" 
                  component={MedicationsScreen} 
                  options={{ tabBarButton: () => null }} 
                />
                <Tab.Screen 
                  name="Nuevo" 
                  component={CreateMedicationsScreen} 
                  options={{ tabBarButton: () => null }} 
                />
                <Tab.Screen 
                  name="EditarUsuario" 
                  component={EditUsersScreen} 
                  options={{ tabBarButton: () => null }} 
                />
                <Tab.Screen 
                  name="EliminarUsuario" 
                  component={DeletetUsersScreen} 
                  options={{ tabBarButton: () => null }} 
                />
                <Tab.Screen 
                  name="EditarMedicina" 
                  component={EditMedicationsScreen} 
                  options={{ tabBarButton: () => null }} 
                />
              </>
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </CreateMedicationsProvider>
    </AuthProvider>
  );
}



function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2196F3" />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
});