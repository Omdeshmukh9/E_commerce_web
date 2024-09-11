import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import custom CSS for styling
import { FaGoogle, FaFacebookF } from 'react-icons/fa'; // Import icons for Google and Facebook
// import Loder from '../Loader/Loader'

export default function Login() {
    const [isLoginView, setIsLoginView] = useState(true); // State to toggle between Login and Sign-Up view
    const contactRef = useRef(null);

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupFullname, setSignupFullname] = useState('');
    const [signupPhone, setSignupPhone] = useState('');
    const [signupDob, setSignupDob] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State to manage loader visibility

    const navigate = useNavigate();

    // Handle login form submission
    const handleLogin = (event) => {
        const LoginApi=process.env.REACT_APP_LOGIN;
        event.preventDefault();
        axios.post(LoginApi, {
            username: loginUsername,
            password: loginPassword
        })
            .then(response => {
                // Save user session data
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setStatus('Login successful. Redirecting to dashboard...');
                setIsLoading(true);

                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    navigate('/Home');
                }, 5000);
            })
            .catch(error => {
                if (error.response) {
                    setStatus(error.response.data);
                } else {
                    setStatus('Invalid Email Or Password');
                }
            });
    };

    // Handle signup form submission
    const handleSignup = (event) => {
        const Signup_API=process.env.REACT_APP_SIGNUP;
        event.preventDefault();
        axios.post(Signup_API, {
            username: signupUsername,
            password: signupPassword,
            emailaddress: signupEmail,
            fullname: signupFullname,
            phonenumber: signupPhone,
            dateofbirth: signupDob
        })
            .then(response => {
                setStatus('Signup successful');
                setIsLoginView(true); // Switch back to login mode
            })
            .catch(error => {
                if (error.response) {
                    setStatus(error.response.data);
                } else {
                    setStatus('Signup failed');
                }
            });
    };

    useEffect(() => {
        // Scroll to the contact form when the component mounts
        if (contactRef.current) {
            contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Function to toggle between Login and Sign Up
    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setStatus(''); // Clear status message when toggling views
    };
    // if (isLoading) {
    //     return <Loder />
    // }

    return (
        <>
            <div className="auth-container" ref={contactRef}>
                <div className="auth-card glass-effect">
                    <h2>{isLoginView ? 'Login' : 'Sign Up'}</h2>

                    {/* Form Fields */}
                    <form onSubmit={isLoginView ? handleLogin : handleSignup}>
                        {!isLoginView && ( // Show additional fields for Sign Up
                            <>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="form-control"
                                        value={signupFullname}
                                        onChange={(e) => setSignupFullname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="form-control"
                                        value={signupUsername}
                                        onChange={(e) => setSignupUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <div className="form-group">
                            <input
                                type={isLoginView ? 'text' : 'email'}
                                placeholder={isLoginView ? 'Username' : 'Email'}
                                className="form-control"
                                value={isLoginView ? loginUsername : signupEmail}
                                onChange={(e) => isLoginView ? setLoginUsername(e.target.value) : setSignupEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                value={isLoginView ? loginPassword : signupPassword}
                                onChange={(e) => isLoginView ? setLoginPassword(e.target.value) : setSignupPassword(e.target.value)}
                                required
                            />
                        </div>
                        {!isLoginView && ( // Show additional fields for Sign Up
                            <>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="form-control"
                                        value={signupPhone}
                                        onChange={(e) => setSignupPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        placeholder="D.O.B"
                                        className="form-control"
                                        value={signupDob}
                                        onChange={(e) => setSignupDob(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary">
                            {isLoginView ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Status Message */}
                    {status && <div className="status-message">{status}</div>}

                    {/* Social Media Sign Up Options */}
                    <div className="social-login">
                        <button className="btn btn-outline-secondary">
                            <FaGoogle /> {isLoginView ? 'Login' : 'Sign Up'} with Google
                        </button>
                        <button className="btn btn-outline-secondary">
                            <FaFacebookF /> {isLoginView ? 'Login' : 'Sign Up'} with Facebook
                        </button>
                    </div>

                    {/* Toggle View Button */}
                    <p className="toggle-text">
                        {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
                        <span onClick={toggleView} className="toggle-link">
                            {isLoginView ? 'Sign Up' : 'Login'}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}
