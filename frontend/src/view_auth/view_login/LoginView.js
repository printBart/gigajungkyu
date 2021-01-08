import React, { useCallback } from "react";
import './LoginView.css';
import app from "../../base";

function LoginView() { 
  async function handleLogin(event){
    event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value).then(user => {
            return app.auth().currentUser.getIdToken(true).then( (token) => {
              console.log(token);
              document.cookie = '__session=' + token + ';max-age=3600';
            })
          }).catch((err) => {
            console.log(err);
          });
      } catch (error) {
        alert(error);
      }
    }
   
    return (
      <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
    );
  }

export default LoginView;