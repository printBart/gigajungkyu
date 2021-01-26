import React from "react";
import './LoginView.css';
import app from "../../base";
import { useHistory } from "react-router-dom";

function LoginView() {
  const history = useHistory();

  //on login user
  async function handleLogin(event){
    event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value).then(user => {
            console.log(user.user.uid);
              document.cookie = '__sessionU=' + user.user.uid + ';max-age=3600';
              history.push("/map");

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