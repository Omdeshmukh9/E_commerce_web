// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.css'; // Import custom CSS for styling
// import { FaGoogle, FaFacebookF } from 'react-icons/fa'; // Import icons for Google and Facebook

// export default function Signup() {
//     const [signupUsername, setSignupUsername] = useState('');
//     const [signupEmail, setSignupEmail] = useState('');
//     const [signupPassword, setSignupPassword] = useState('');
//     const [signupFullname, setSignupFullname] = useState('');
//     const [signupPhone, setSignupPhone] = useState('');
//     const [signupDob, setSignupDob] = useState('');
//     const [status, setStatus] = useState('');

//     const handleSignup = (event) => {
//         event.preventDefault();
//         axios.post('http://localhost:8090/signup', {
//             username: signupUsername,
//             password: signupPassword,
//             emailaddress: signupEmail,
//             fullname: signupFullname,
//             phonenumber: signupPhone,
//             dateofbirth: signupDob
//         })
//         .then(response => {
//             setStatus('Signup successful');
//         })
//         .catch(error => {
//             if (error.response) {
//                 setStatus(error.response.data);
//             } else {
//                 setStatus('Signup failed');
//             }
//         });
//     };

//     return (
//         <div className="auth-container">
//             <div className="auth-card glass-effect">
//                 <h2>Sign Up</h2>
//                 <form onSubmit={handleSignup}>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             placeholder="Full Name"
//                             className="form-control"
//                             value={signupFullname}
//                             onChange={(e) => setSignupFullname(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             className="form-control"
//                             value={signupUsername}
//                             onChange={(e) => setSignupUsername(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             className="form-control"
//                             value={signupEmail}
//                             onChange={(e) => setSignupEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             className="form-control"
//                             value={signupPassword}
//                             onChange={(e) => setSignupPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="tel"
//                             placeholder="Phone"
//                             className="form-control"
//                             value={signupPhone}
//                             onChange={(e) => setSignupPhone(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="date"
//                             placeholder="D.O.B"
//                             className="form-control"
//                             value={signupDob}
//                             onChange={(e) => setSignupDob(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary">
//                         Sign Up
//                     </button>
//                 </form>
//                 <div className="social-login">
//                     <button className="btn btn-outline-secondary">
//                         <FaGoogle /> Sign Up with Google
//                     </button>
//                     <button className="btn btn-outline-secondary">
//                         <FaFacebookF /> Sign Up with Facebook
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
