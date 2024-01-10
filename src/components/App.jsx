import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/store/slices/userSlice';
import Navbar from './Navbar/Navbar';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Users from 'pages/Users';
import Profile from 'pages/Profile';
import { useAuth } from '../hooks/use-auth';

export function App() {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (localStorage.getItem('authorized') === 'true') {
      dispatch(setUser({ token: 'token', id: '123213123qweqweqwe' }));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={isAuth ? <Users /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}
