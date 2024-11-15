// client/src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css'; // Importar los estilos CSS

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto de enviar el formulario
  
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
  
      localStorage.setItem('accessToken', response.data.access_token);
      onLogin(response.data.user); // Llamar a la función onLogin para actualizar el estado de autenticación
      console.log('Email:', email);
      alert('Login Exitoso');
      console.log('Password:', password);
    } catch (error) {
      console.error('Error logging in', error);
      alert('Login failed');
      console.log('Email:', email);
console.log('Password:', password);
    }
    

  };;

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>User Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
