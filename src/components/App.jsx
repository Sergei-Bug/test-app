import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/store/slices/userSlice';
import Navbar from './Navbar/Navbar';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Users from 'pages/Users/Users';
import Test from 'pages/Test/Test';
import Profile from 'pages/Profile/Profile';
import PrivateRoute from 'utils/router/privateRoute';
import { useSelector } from 'react-redux';

export function App() {
  const dispatch = useDispatch();
  const { isUserDataLoaded } = useSelector(state => state.user);

  useEffect(() => {
    if (localStorage.getItem('authorized') === 'true') {
      dispatch(
        setUser({
          token: 'token',
          id: '123213123qweqweqwe',
          isUserDataLoaded: true,
        })
      );
    } else {
      dispatch(
        setUser({
          isUserDataLoaded: true,
        })
      );
    }
  }, [dispatch]);

  return isUserDataLoaded ? (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={<PrivateRoute component={<Users />} />}
          />
          <Route path="/test" element={<PrivateRoute component={<Test />} />} />
          <Route
            path="/profile"
            element={<PrivateRoute component={<Profile />} />}
          />
        </Routes>
      </Router>
    </div>
  ) : null;
}
