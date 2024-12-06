
import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css'; 

const RegisterForm = () => {
  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/register', {
        userName,
        email,
        password,
      });
      console.log(response.data);
      alert('Registration successful');
    } catch (error) {
      console.error('Error', error);
      alert('Registro fallido');
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Registro de usuarios</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterForm;
