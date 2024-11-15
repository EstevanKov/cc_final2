// app/(tabs)/_layout.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UsersScreen from '../users/loged';
import CreateMedicationsScreen from '../medications/create'; 
import MedicationsScreen from '../medications/index'; 

const Tab = createBottomTabNavigator();

const getIconName = (routeName: string): keyof typeof Ionicons.glyphMap => {
  switch (routeName) {
    case 'medications/index':
      return 'heart';
    case 'medications/create':
      return 'medkit';
    case 'users/loged':
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
      <Tab.Screen name="users/loged" component={UsersScreen} options={{ title: '' }} />
      <Tab.Screen name="medications/index" component={MedicationsScreen} options={{ title: '' }} />
      <Tab.Screen name="medications/create" component={CreateMedicationsScreen} options={{ title: '' }} />
    </Tab.Navigator>
  );
}
