import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import MedicineForm from './components/MedicineForm';
import axios from 'axios';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = async (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('accessToken'); // Limpiar token al cerrar sesión
  };

  const handleMedicineRegistration = async (medicineData) => {
    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('http://localhost:3000/medicarions', medicineData, config);
      alert('Medicine registration successful');
    } catch (error) {
      console.error('Error registering medicine:', error);
      alert('Medicine registration failed');
    }
  };

  return (
    <div className="App">
      {!loggedInUser ? (
        <div>
          <RegisterForm />
          <hr />
          <LoginForm onLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h1>Welcome, {loggedInUser.name}</h1>
          <button onClick={handleLogout}>Logout</button>
          <MedicineForm onMedicineSubmit={handleMedicineRegistration} />
        </div>
      )}
    </div>
  );
};

export default App;
