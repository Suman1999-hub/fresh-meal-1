import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../App';

export const OnlyAuthUser = ({ children }) => {
  let context = useContext(userContext);
  const location = useLocation();

  if (!context.user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  if(context.user && context.user.email !== '1999sumanrana@gmail.com') {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return children;
};
