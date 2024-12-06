import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigation, useRouter } from 'expo-router';
import {config} from  '../../../../config/config'
import { NavigationProp } from '@react-navigation/native';
import { RootTabParamList } from '../../types';
const API_URL = config.API_URL;


interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export const useCreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigation = useNavigation<NavigationProp<RootTabParamList>>(); // Usar el tipo adecuado

  const handleCreateUser = async (): Promise<{ success: boolean; message: string }> => {
    const userData = {
      user: name,
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post(`${API_URL}auth/register`, userData);
  
      setSuccessMessage(response.data.message);
      setErrorMessage('');
  
      return { success: true, message: response.data.message };
    } catch (error) {
      const axiosError = error as AxiosError;
  
      if (axiosError.response && axiosError.response.data) {
        const errorData = axiosError.response.data as ErrorResponse;
        setErrorMessage(errorData.message);
        setSuccessMessage('');
        return { success: false, message: errorData.message };
      } else {
        const fallbackMessage = 'Error desconocido. Inténtalo de nuevo.';
        setErrorMessage(fallbackMessage);
        setSuccessMessage('');
        return { success: false, message: fallbackMessage };
      }
    }
  };
  
  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    errorMessage,
    successMessage,
    handleCreateUser,
  };
};
