import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import { saveToken } from '../../utils/token';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://135.181.152.249:8072/Account/login', {
        userName: username,
        password: password
      });

      if (response.status === 200 && response.data.data) {
        console.log('Login successful', response.data);
        saveToken(response.data.data); // Use saveToken to store the token
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        setError('Login failed');
      }
    } catch (err) {
      console.error('Error logging in', err);
      setError('An error occurred during login');
    }
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='w-[50%] h-screen bg-[#1c2536] flex p-[0_50px] flex-col justify-center gap-2'>
        <p className="text-white text-[30px] tracking-[1px] font-bold">Welcome to admin panel</p>
        <img src="../src/assets/logo.svg" alt="logo" className='w-[50%]' />
      </div>
      <div className='w-[25%] mr-[11%] flex flex-col items-start gap-5 ph:w-[90%]'>
        <p className="text-[30px] font-[600]">Log In</p>

        <form className='flex flex-col gap-5 w-[100%]' onSubmit={handleLogin}>
          <input
            type="text"
            className='text-[20px] w-[100%] border outline-none border-[gray] p-[5px_10px] rounded-md h-[6svh]'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className='text-[20px] w-[100%] border outline-none border-[gray] p-[5px_10px] rounded-md h-[6svh]'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-[20px] text-red-500 text-center">{error}</p>}
          <p className="text-[20px] text-[#1c2536] text-center cursor-pointer">Forget Password?</p>
          <button className='rounded-md text-white text-[20px] py-[10px] bg-[#DB4444]' type='submit'>Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
