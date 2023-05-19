import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../contexts/GlobalContexts';

export default function RequiresAuth({ children })
{
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn ? children : <Navigate to="/login" />;
}