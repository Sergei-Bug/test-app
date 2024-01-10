import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/store/slices/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.user);

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [fakePromise, setFakePromise] = useState(null);

  useEffect(() => {
    if (!id) {
      new Promise(resolve => setFakePromise(() => resolve)).then(
        ({ token, id }) => dispatch(setUser({ token, id }))
      );
    }
  }, [dispatch, id]);

  const handleLogin = () => {
    if (login === 'admin' && pass === 'pass12345') {
      localStorage.setItem('authorized', 'true');
      fakePromise({ token: 'token', id: '123213123qweqweqwe' });
    } else {
      alert('Username or password entered is incorrect.');
    }
  };

  return (
    <div className="wrapperRoot ">
      <h1 className="title-login">Log in to application</h1>
      <div className="form-login">
        <p>Login</p>
        <input
          type="text"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        <button className="btn-login" onClick={handleLogin}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
