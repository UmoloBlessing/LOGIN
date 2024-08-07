import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Response() {
  const location = useLocation();
  const { userData } = location.state || { userData: null };

  if (!userData) {
    return <p>No user data available</p>;
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8'>
        <h2 className='text-xl font-bold mb-4 text-center'>User Details</h2>
        <p><strong>First Name:</strong> {userData.user.first_name}</p>
        <p><strong>Last Name:</strong> {userData.user.last_name}</p>
        <p><strong>Profile Picture:</strong> {userData.user.profile_picture || 'N/A'}</p>
        <p><strong>Token:</strong> {userData.token}</p>
      </div>
    </div>
  );
}
