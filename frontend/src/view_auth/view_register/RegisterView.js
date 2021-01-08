import React, { useCallback } from 'react';
import app from "../../base";
import './RegisterView.css';

function RegisterView() { 

  async function handleSignUp(event) {
    event.preventDefault();
    const { email, password, username } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      return app.auth().currentUser.updateProfile({displayName: username.value});
    } catch (error) {
      alert(error);
    }
  }
 
    return (
      <div>
        <h1>Sign up</h1>
        <form onSubmit={handleSignUp}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }

export default RegisterView;