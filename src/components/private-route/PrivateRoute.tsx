import { Navigate } from 'react-router-dom';
import { getToken } from '@/services/auth.service';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
