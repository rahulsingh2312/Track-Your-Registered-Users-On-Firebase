'use client'

// pages/index.js

import { useState, useEffect } from 'react';

const Home = () => {
  const [userCount, setUserCount] = useState('Loading...');

  useEffect(() => {
    fetch(`/api/userCount?${new Date().getTime()}` , {cache : 'no-store'})
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch user count');
        }
        return res.json();
      })
      .then(data => {
        setUserCount(`Number of registered users: ${data.count}`);
      })
      .catch(error => {
        console.error('Error fetching user count:', error);
        setUserCount('Failed to fetch user count');
      });
  }, []);

  return (
    <div>
      <h1>User Count</h1>
      <p>{userCount}</p>
    </div>
  );
};

export default Home;
