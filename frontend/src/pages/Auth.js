import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

function Auth() {
  const user = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(true);
  const onSubmitAuth = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    if (email.trim().length === 0 && password.trim().length) {
      return;
    }
    console.log(email, password)
    let requestBody = {};
    requestBody = {
      query: `
            query {
               login(email:"${email}", password:"${password}"){
                 token
                 tokenExpiration
                 userId
               }
            }`,
    };
    if (!isSignUp) {
      requestBody = {
        query: `
             mutation {
               createUser(userInput:{email:"${email}", password:"${password}"}){
                 email
                 _id
               }
             }`,
      };
    }
    try {
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const result = await response.json();
      console.log(result.data);
      if(result?.data?.login?.token){
        user.login(result?.data?.login?.token, result?.data?.login?.userId, result?.data?.login?.tokenExpiration)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center w-25 mx-auto mt-5">
      <main className="form-signin">
        <form onSubmit={(e) => onSubmitAuth(e)}>
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating mt-2">
            <input
              type="email"
              name="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mt-2">
            <input
              type="password"
              name="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="d-flex gap-10 mt-2">
            <button className="w-100 btn btn-small btn-primary" type="submit">
              {!isSignUp ? "SignUp" : "Login"}
            </button>
            <button
              className="w-100 btn btn-small btn-primary mx-1"
              onClick={() => setIsSignUp(!isSignUp)}
              type="button"
            >
              Switch to {isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
          <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
        </form>
      </main>
    </div>
  );
}

export default Auth;
