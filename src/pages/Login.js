import React, { useState } from 'react';

const Login = () => {
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    alert(`Logging in with phone: ${phone}`);
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="tel" 
        placeholder="Enter phone number" 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
