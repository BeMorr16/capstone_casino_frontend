import { useState } from 'react';
import './LoginRegister.css';

export default function LoginRegister() {
  const [signIn, setSignIn] = useState(true);

  const toggle = () => setSignIn(!signIn);

  return (
    <div className="container">
      <div className={`sign-up-container ${!signIn ? 'active' : ''}`}>
        <form className="form">
          <h1>Create Account</h1>
          <input type='text' placeholder='Username' className="input" />
          <input type='email' placeholder='Email' className="input" />
          <input type='password' placeholder='Password' className="input" />
          <div>
        <input type="radio" id="mode1" name="mode" value={1} />
        <label htmlFor="mode1">Easy</label>

        <input type="radio" id="mode2" name="mode" value={2} />
        <label htmlFor="mode2">Medium</label>

        <input type="radio" id="mode3" name="mode" value={3} />
        <label htmlFor="mode3">Hard</label>
          </div>
          <button type='button' className="button">Sign Up</button>
        </form>
      </div>

      <div className={`sign-in-container ${signIn ? 'active' : ''}`}>
        <form className="form">
          <h1>Sign in</h1>
          <input type='text' placeholder='Username' className="input" />
          <input type='password' placeholder='Password' className="input" />
          {/* <a href='#' className="anchor">Forgot your password?</a> */}
          <button type='button' className="button">Sign In</button>
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
