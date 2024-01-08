import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import loginState from './login';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    if (login === 'admin' && pass === 'pass12345') {
      // dispatch(loginState());
      dispatch(
        setLogin({
          login: login,
          token: pass,
        })
      );
    } else {
      alert('Username or password entered is incorrect.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={login}
        onChange={e => setLogin(e.target.value)}
        placeholder="login"
      />
      <input
        type="password"
        value={pass}
        onChange={e => setPass(e.target.value)}
        placeholder="password"
      />
      <button onClick={handleLogin}>Button</button>
    </div>
  );
};

export default LoginForm;
