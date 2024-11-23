import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UsersScreen from '../users/loged';
import CreateMedicationsScreen from '../medications/create';
import MedicationsScreen from '../medications/index';

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
  );
}
