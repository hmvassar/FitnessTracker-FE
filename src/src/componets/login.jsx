import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const API_URL = "https://fitnesstrac-kr.herokuapp.com/api/";

const Login = () => {
    const { setIsLoggedIn, setUser } = useOutletContext();
    const { setToken } = useOutletContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //reroute user after loggin in
    const navigate = useNavigate();

    const login = async () => {
      try {
        const response = await fetch(`${API_URL}users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username: username,
              password: password
          }),
        });
        const result = await response.json();
        console.log(result);
        if (result.user) {
          setIsLoggedIn(true);
          setToken(result.token);
          localStorage.setItem("token",result.token);
          localStorage.setItem("user", result.user.username);
          setUser(result.user.username);
          navigate("/");
        } else {
          alert("Invalid username or password: please try again");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setUsername("");
        setPassword("");
      }
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
      login();
    };



  return (
    <div className="text-center flex-col bg-blue-200 ">
      <h2 className="text-black-400">
        Sign in.
      </h2>
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="font-bold">
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            type="text"
            className="text-black"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            minLength="5"
            maxLength="20"
            required
          />
        </div>
        <div className="">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            className="text-black"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength="5"
            maxLength="20"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-beige-200 text-black-400"
        >
          Login
        </button>
      </form>
      <p>
        Ready to start?{" "}
        <Link to="/register" className="underline">
          Register now.
        </Link>
      </p>
    </div>
  );
};

export default Login;