import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/use-auth';
import { removeUser } from 'redux/store/slices/userSlice';

const Navbar = () => {
  const activeLink = 'nav-list_link nav-list_link--active';
  const NotActiveLink = 'nav-list_link';
  const { isAuth } = useAuth();

  return (
    <div>
      <div className="header">
        <div className="header-menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeLink : NotActiveLink
            }
          >
            Home
          </NavLink>
          {!isAuth && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? activeLink : NotActiveLink
              }
            >
              Log In
            </NavLink>
          )}
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? activeLink : NotActiveLink
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? activeLink : NotActiveLink
            }
          >
            Profile
          </NavLink>
        </div>
        <Logout />
      </div>
    </div>
  );
};

const Logout = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const handleLogOut = () => {
    dispatch(removeUser());
    localStorage.setItem('authorized', 'false');
  };

  return (
    isAuth && (
      <div className="navbar-container-logout">
        <div className="navbar-logout-block">
          <NavLink className="nav-list_link navbar-logout-title" to="/profile">
            Welcome, admin!
          </NavLink>
          <button className="navbar-btn-logout" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      </div>
    )
  );
};

export default Navbar;
