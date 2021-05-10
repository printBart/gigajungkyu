import React from 'react';
import app from "../../base";
import { registerUserQuery } from '../../functions_global/queries';
import { postRequest } from '../../functions_global/request';
import './RegisterView.css';

function RegisterView() { 

  async function handleSignUp(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value).then((user) => {
          registerUser(email.value);
        });
    } catch (error) {
      alert(error);
    }
  }

  function registerUser(email){
    let token = app.auth().currentUser.uid
    const request = postRequest(
      registerUserQuery(token, email, "engineering"),
      "/graphql"
    );
    fetch(request).then((response) => {
      response.json().then((data) => {
        console.log(data);
      })
    });
  }
 
  return(
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