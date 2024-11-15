import React, { useState } from 'react';
import axios from 'axios';
const token = localStorage.getItem('accessToken');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const MedicineForm = ({ user }) => {
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/medications',
        {
          userId: user.id,
          medicineName,
          quantity,
        },config
      );

      alert('Medicine registration successful');
      setMedicineName('');
      setQuantity('');
    } catch (error) {
      console.error('Error registering medicine:', error);
      alert('Medicine registration failed');
    }
  };

  return (
    <form className="medicine-form" onSubmit={handleSubmit}>
      <h2>Register Medicine</h2>
      <div>
        <label>Medicine Name:</label>
        <input
          type="text"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register Medicine</button>
    </form>
  );
};

export default MedicineForm;
