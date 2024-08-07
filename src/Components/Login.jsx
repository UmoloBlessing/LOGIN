import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [apiResponse, setApiResponse] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let emailError = '';
    let passwordError = '';

    if (!validateEmail(email)) {
      emailError = 'Invalid email';
      valid = false;
    }

    if (!validatePassword(password)) {
      passwordError = 'Incorrect password';
      valid = false;
    }
    
    if (valid) {
      try {
        const response = await fetch('https://dms-api.apps.ginnsltd.com/v1/login', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.toLowerCase(), password }),
        });

        const data = await response.json();
        console.log('API Response:', data);

        if (data.ok) {
          setShowPopup(true);
          setApiResponse('Login successful');
          setTimeout(() => {
            navigate('/Response', { state: { userData: data } });
          }, 2000); 
        } else {
          setApiResponse(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        setApiResponse('An error occurred. Please try again.');
      }
    } else {
      setErrors({ email: emailError, password: passwordError });
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center relative'>
      {showPopup && (
        <div className='absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-900 bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-md flex flex-col justify-center items-center'>
            <h3 className='text-xl font-bold mb-4'>Login Successful</h3>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className='w-full max-w-md flex flex-col justify-center items-center'>
        <div className='flex justify-center'>
          <h1 className='font-extrabold'>BLESSING</h1>
        </div>
        <div className="w-full flex justify-center items-center mt-6">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
            <h2 className="mb-4 text-xl font-bold text-center">Login</h2>
            <div className="mb-4 mt-10">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Login
              </button>
            </div>
            {apiResponse && <p className={`text-xs italic text-center mt-4 ${apiResponse === 'Login successful' ? 'text-green-500' : 'text-red-500'}`}>{apiResponse}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
