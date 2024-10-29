import  { useState } from 'react';
import PropTypes from 'prop-types';

import email_icon from "../assets/communication.png";
import password_icon from "../assets/padlock.png";

function Auth({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignUp = async () => {
 
    const res = await fetch(`http://localhost:8000/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert('Signup success');
    } else {
      const errorData = await res.json();
     
      alert(errorData.message)
    }
  };

  const handleSignIn = async () => {
   
    const res = await fetch(`http://localhost:8000/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
    } else {
      const errorData = await res.json();
    
      alert(errorData.message)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
    <div className="flex items-center mb-4">
      <img src={email_icon} alt="Email icon" className="h-5 w-5 mr-2" />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="flex items-center mb-6">
      <img src={password_icon} alt="Password icon" className="h-5 w-5 mr-2" />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button
      onClick={handleSignUp}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mb-3 transition-colors duration-200"
    >
      Sign Up
    </button>
    <button
      onClick={handleSignIn}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
    >
      Sign In
    </button>
  </div>
</div>

  );
}
Auth.propTypes = {
  setToken: PropTypes.func.isRequired, // Define prop types for setToken
};
export default Auth;
