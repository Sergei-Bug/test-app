import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/store/slices/userSlice';
import Navbar from './Navbar/Navbar';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Users from 'pages/Users';
import Profile from 'pages/Profile';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('authorized') === 'true') {
      console.log('--------------------------------------------');
      dispatch(setUser({ token: 'token', id: '123213123qweqweqwe' }));
    }
  }, []);

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
