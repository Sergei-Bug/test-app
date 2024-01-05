import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Users from 'pages/Users';
import Profile from 'pages/Profile';

export function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}
