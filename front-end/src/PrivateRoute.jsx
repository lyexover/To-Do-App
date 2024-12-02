import { Navigate, Outlet, useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = () => {
  let decoded = null
  const params = useParams()

  const token = localStorage.getItem('token');
  if(!token) return <Navigate to="/login" />
  
  decoded = jwtDecode(token)
  return decoded.userId == params.userID ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;