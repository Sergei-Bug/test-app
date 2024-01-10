import { Navigate } from 'react-router-dom';
import ProfileBlock from 'components/ProfileBlock/ProfileBlock';
import { useAuth } from 'hooks/use-auth';

const Profile = () => {
  const isAuth = useAuth();

  return isAuth ? (
    <div className="wrapperRoot">
      <ProfileBlock />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Profile;
