import React from 'react';
import { connect } from 'react-redux';
import { setUserData } from '../redux/actions';

const LoginPage = ({ setUserData }) => {
  const handleLogin = () => {
    // Perform login logic and get user data
    const userData = { name: 'John Doe', /* Add more user data as needed */ };
    setUserData(userData);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
      {/* Add more content as needed */}
    </div>
  );
};

const mapDispatchToProps = {
  setUserData,
};

export default connect(null, mapDispatchToProps)(LoginPage);
