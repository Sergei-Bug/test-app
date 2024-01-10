import { NavLink } from 'react-router-dom';

import { Navigate } from 'react-router-dom';
// import ProfileBlock from 'components/ProfileBlock/ProfileBlock';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/use-auth';
import { removeUser } from 'redux/store/slices/userSlice';

// import { Outlet } from 'react-router-dom';
// // import { UserBlock } from 'components/UserBlock/UserBlock';
// // import { useSelector } from 'react-redux';
// // import { selectIsLoggedIn } from 'redux/auth/selectors';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const Layout = () => {
//   // const isLogged = useSelector(selectIsLoggedIn);

//   return (
//     <div>
//       <Header>
//         <HeaderMenu>
//           {/* <StyledLink to="/" end> */}
//           Home
//           {/* </StyledLink> */}
//           {/* {isLogged && <StyledLink to="/contacts">Contacts</StyledLink>}
//           {!isLogged && <StyledLink to="/register">Register</StyledLink>}
//           {!isLogged && <StyledLink to="/login">Log In</StyledLink>} */}
//         </HeaderMenu>
//         {/* {isLogged && <UserBlock />} */}
//       </Header>
//       <Outlet />
//       <ToastContainer />
//     </div>
//   );
// };

const Navbar = () => {
  const activeLink = 'nav-list_link nav-list_link--active';
  const NotActiveLink = 'nav-list_link';

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
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? activeLink : NotActiveLink
            }
          >
            Log In
          </NavLink>
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
        <Profile />
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();

  const isAuth = useAuth();

  return isAuth ? (
    <div className="navbar-container-logout">
      <div className="navbar-logout-block">
        <NavLink className="nav-list_link navbar-logout-title" to="/profile">
          Welcome, admin!
        </NavLink>
        <button
          className="navbar-btn-logout"
          onClick={() => dispatch(removeUser())}
        >
          Log out
        </button>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Navbar;
