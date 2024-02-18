import './App.css';
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProfilePage from './containers/ProfilePage';
import LoginPage from './containers/LoginPage';
import Switch from 'react';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/login" component={LoginPage} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
