import React, { useContext, useState } from 'react';
import NavBar from '../ui/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../constants';
import { AuthContext } from '../contexts/GlobalContexts';
import '../../styles/signup_page.css';


export default function Signup()
{
    const location = useLocation();
    const navigate = useNavigate();

    const { handleLoginUpdate } = useContext(AuthContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFirstNameChange = (event) =>
    {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) =>
    {
        setLastName(event.target.value);
    };

    const handleEmailInput = (event) =>
    {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) =>
    {
        setPassword(event.target.value);
    };

    const handleSignUp = (event) =>
    {
        event.preventDefault();
        signUp(firstName, lastName, email, password);
    };

    const handleLogin = (event) =>
    {
        event.preventDefault();
        navigate(`/login`);
    };

    const signUp = async (firstName, lastName, email, password) =>
    {

        try
        {
            const res = await fetch(API_ENDPOINTS.SIGNUP,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, firstName, lastName }),
                });

            if (res.ok)
            {
                const data = await res.json();
                localStorage.setItem("token", data.encodedToken);
                handleLoginUpdate(true);
                console.log(data);
                navigate(location?.state?.from?.pathname);
            }
            else
            {
                console.log('SIGNUP FAILED');
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
            <div className="signup-container">
                <div className="signup-content">
                    <div className="signup-chunk">
                        <h2>Sign up</h2>
                    </div>
                    <div className="signup-chunk">
                        <div className="name-row">
                            <label className="signup-label" for="mail">First name</label>
                            <input placeholder="First name" class="text-input" type="text" required="" value={firstName} onChange={handleFirstNameChange}></input>
                        </div>
                        <div className="name-row">
                            <label className="signup-label" for="mail">Last name</label>
                            <input placeholder="Last name" class="text-input" type="text" required="" value={lastName} onChange={handleLastNameChange}></input>
                        </div>
                    </div>
                    <div className="signup-chunk">
                        <label className="signup-label" for="mail">Email Address</label>
                        <input placeholder="something@somemail.com" class="text-input" type="text" required="" value={email} onChange={handleEmailInput}></input>
                    </div>
                    <div className="signup-chunk">
                        <label className="signup-label"
                            for="mail">Password</label>
                        <input placeholder="********" class="text-input" type="password" required="" value={password} onChange={handlePasswordChange}></input>
                    </div>
                    <div className="signup-chunk">
                        <button onClick={handleSignUp}>
                            Sign up
                        </button>
                    </div>
                    <div className="signup-chunk">
                        <button onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}