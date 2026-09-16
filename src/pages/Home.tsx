import React from 'react';
import LoginSignup from './LoginSignup';

const Home: React.FC = () => {
  const handleAuthSuccess = () => {
    // Redirect or update state after successful auth
    window.location.href = '/';
  };

  return (
    <div className="h-screen">
      <LoginSignup onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default Home;
