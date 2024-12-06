import axios from "axios";
import Loginstorage from "../../storage";
import { config } from "../../../../config/config";

const API_URL = config.API_URL;

interface LoginResponse {
  success: boolean;
  message: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const loginData = { email, password };

  try {
    const response = await axios.post(`${API_URL}auth/login`, loginData);
    const { access_token, refresh_token, id, message } = response.data;

    await Loginstorage.setItem("id",  id.toString());
    await Loginstorage.setItem("access_token", access_token);
    await Loginstorage.setItem("refresh_token", refresh_token);

    return { success: true, message: message || "Inicio de sesión exitoso" };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Error desconocido. Inténtalo de nuevo.";
    return { success: false, message: errorMessage };
  }
};
