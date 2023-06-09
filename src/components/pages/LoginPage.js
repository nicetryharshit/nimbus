import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../constants';
import { AuthContext, UserContext, ToastContext } from '../contexts/GlobalContexts';
import NavBar from '../ui/NavBar';
import '../../styles/login_page.css';


export default function Login()
{
    const { showToast } = useContext(ToastContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { updateLoginState } = useContext(AuthContext);
    const { userProfile, updateUserProfile, updateCartData, updateWishlistData } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    const handleEmailInput = (event) =>
    {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) =>
    {
        setPassword(event.target.value);
    };

    const handleLogin = (event) =>
    {
        event.preventDefault();
        login(email, password);
    }
    const handleLoginGuest = (event) =>
    {
        event.preventDefault();
        login("adarshbalika@gmail.com", "adarshbalika");
    }
    const handleSignup = (event) =>
    {
        event.preventDefault();
        navigate(`/signup`);
    }

    const login = async (email, password) =>
    {
        console.log(`Logging in using ${email} and ${password}`);

        try
        {
            const res = await fetch(API_ENDPOINTS.LOGIN,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

            if (res.ok)
            {
                const data = await res.json();
                localStorage.setItem("token", data.encodedToken);
                updateUserProfile(data.foundUser);
                updateCartData(data.foundUser.cart);
                updateWishlistData(data.foundUser.wishlist);
                updateLoginState(true);
                navigate(location?.state?.from?.pathname === undefined ? `/store` : location?.state?.from?.pathname);
                showToast("Login successful");
            }
            else
            {
                showToast("Login failed");
                console.log('LOGIN FAILED');
            }
        }
        catch (error)
        {
            console.log(error);
        }
    };
    return (
        <div>
            <NavBar />
            <div className="login-container">
                <div className="login-content">
                    <div className="login-chunk">
                        <h2>Sign in</h2>
                    </div>
                    <div className="login-chunk">
                        <label className="login-label" for="mail">Email Address</label>
                        <input placeholder="something@somemail.com" class="text-input" type="text" required="" value={email} onChange={handleEmailInput}></input>
                    </div>
                    <div className="login-chunk">
                        <label className="login-label"
                            for="mail">Password</label>
                        <input placeholder="********" class="text-input" type="password" required="" value={password} onChange={handlePasswordChange}></input>
                    </div>
                    <div className="login-chunk">
                        <button onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                    <div className="login-chunk">
                        <button onClick={handleLoginGuest}>
                            Guest login
                        </button>
                    </div>
                    <div className="login-chunk">
                        <button onClick={handleSignup}>
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}