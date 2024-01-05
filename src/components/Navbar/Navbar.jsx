import { NavLink } from 'react-router-dom';

// import { Outlet } from 'react-router-dom';
// import { Header, HeaderMenu /*StyledLink*/ } from './Layout.styled';
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
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Log In</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </div>
  );
};

export default Navbar;
