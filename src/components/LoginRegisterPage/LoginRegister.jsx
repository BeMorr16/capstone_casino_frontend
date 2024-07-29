import { useState } from 'react';
import './LoginRegister.css';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../Utils/APIRequests';

export default function LoginRegister() {
  const [signIn, setSignIn] = useState(true);
  const [signInFormData, setSignInFormData] = useState({
    username: "",
    password: ""
  });
  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    email: "",
    password: "",
    mode: null
  });
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate('/warehouse')
    }
  })
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate('/warehouse')
    }
  })

  function handleSignUpFormChange(e) {
    const { name, value } = e.target;
    setSignUpFormData((prev) => ({
      ...prev,
      [name]: name === "mode" ? parseInt(value) : value
    }));
  }
  
  function handleSignInFormChange(e) {
    const { name, value } = e.target;
    setSignInFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSignUpSubmit(e) {
    e.preventDefault();
    registerMutation.mutate(signUpFormData);
  }

  function handleSignInSubmit(e) {
    e.preventDefault();
    loginMutation.mutate(signInFormData);
  }

  const toggle = () => setSignIn(!signIn);

  return (
    <div className="container">
      <div className={`sign-up-container ${!signIn ? 'active' : ''}`}>
        <form className="form" onSubmit={handleSignUpSubmit}>
          <h1>Create Account</h1>
          <input type='text' placeholder='Username' name='username' className="input" onChange={handleSignUpFormChange} required/>
          <input type='email' placeholder='Email' name='email' className="input" onChange={handleSignUpFormChange} required/>
          <input type='password' placeholder='Password' name='password' className="input" onChange={handleSignUpFormChange} required/>
          <div>
        <input type="radio" id="mode1" name="mode" value={1} onChange={handleSignUpFormChange}/>
        <label htmlFor="mode1">Easy</label>

        <input type="radio" id="mode2" name="mode" value={2} onChange={handleSignUpFormChange}/>
        <label htmlFor="mode2">Medium</label>

        <input type="radio" id="mode3" name="mode" value={3} onChange={handleSignUpFormChange}/>
            <label htmlFor="mode3">Hard</label>
            
          </div>
        <input type="radio" id="mode4" name="mode" value={4} onChange={handleSignUpFormChange}/>
        <label htmlFor="mode4">Impossible</label>
          <button className="button" disabled={signUpFormData.mode === null}>Sign Up</button>
        </form>
      </div>

      <div className={`sign-in-container ${signIn ? 'active' : ''}`}>
        <form className="form" onSubmit={handleSignInSubmit}>
          <h1>Sign in</h1>
          <input type='text' placeholder='Username' name='username' className="input" onChange={handleSignInFormChange} required/>
          <input type='password' placeholder='Password' name='password' className="input" onChange={handleSignInFormChange} required/>
          <button className="button">Sign In</button>
        </form>
      </div>

      <div className={`overlay-container ${signIn ? '' : 'active'}`}>
        <div className="overlay">
          <div className={`left-overlay-panel ${signIn ? 'inactive' : ''}`}>
            <h1>Welcome Back!</h1>
            <p>Login with your personal info get your progress</p>
            <button type='button' className="ghost-button" onClick={toggle}>Sign In</button>
          </div>
          <div className={`right-overlay-panel ${signIn ? '' : 'inactive'}`}>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey</p>
            <button type='button' className="ghost-button" onClick={toggle}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
