import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Decidir qué almacenamiento utilizar según el entorno
export const storage = Platform.OS === 'web' ? window.localStorage : AsyncStorage;