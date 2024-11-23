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


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UsersScreen from './users/loged';
import CreateMedicationsScreen from './medications/create';
import MedicationsScreen from './medications/index';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const getIconName = (routeName: string): keyof typeof Ionicons.glyphMap => {
  switch (routeName) {
    case 'Medications':
      return 'heart';
    case 'Create Medication':
      return 'medkit';
    case 'User':
      return 'person';
    default:
      return 'home';
  }
};

export default function TabLayout() {
  return (
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
      <Tab.Screen name="users/loged" component={UsersScreen} />
      <Tab.Screen name="medications" component={MedicationsScreen} />
      <Tab.Screen name="medications/create" component={CreateMedicationsScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}
