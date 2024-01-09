import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/store/slices/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.user);

  console.log(id, '-------');

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [fakePromise, setFakePromise] = useState(null);

  useEffect(() => {
    new Promise(resolve => setFakePromise(() => resolve)).then(
      ({ token, id }) => dispatch(setUser({ token, id }))
    );
  }, []);

  const handleLogin = () => {
    if (login === 'admin' && pass === 'pass12345') {
      localStorage.setItem('authorized', 'true');
      fakePromise({ token: 'token', id: '123213123qweqweqwe' });
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
