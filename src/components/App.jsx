import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/store/slices/userSlice';
import Navbar from './Navbar/Navbar';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Users from 'pages/Users/Users';
import Profile from 'pages/Profile/Profile';
import PrivateRoute from 'utils/router/privateRoute';

export function App() {
  const dispatch = useDispatch();

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
            // element={<PrivateRoute component={<Users />} />}
            element={<Users />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute component={<Profile />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
