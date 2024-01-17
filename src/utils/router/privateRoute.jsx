import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

const PrivateRoute = ({ component }) => {
  const { isAuth } = useAuth();

  return isAuth ? component : <Navigate to="/login" />;
};

export default PrivateRoute;
