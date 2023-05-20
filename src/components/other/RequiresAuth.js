import { useContext } from 'react';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/GlobalContexts';

export default function RequiresAuth({ children })
{
    const { isLoggedIn } = useContext(AuthContext);
    const location = useLocation();
    return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
}