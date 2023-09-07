import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const API_URL = "https://fitnesstrac-kr.herokuapp.com/api/";

const Register = () => {
  const { setIsLoggedIn, setUser } = useOutletContext();
  const { setToken } = useOutletContext();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await fetch(`${API_URL}users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: newUsername,
            password: newPassword,
        }),
      });
      const result = await response.json();
      console.log(result)
      if (result) {
        setIsLoggedIn(true);
        setToken(result.token);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.user.username);
        setUser(result.user.username);
        navigate("/");
      } else {
        alert("Registration unsuccessful, please try again");
      }
    } catch (error) {
      console.error(error);
      alert("Registration unsuccessful, please try again");
    } finally {
      setNewUsername("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted with ", newUsername, newPassword, confirmPassword);
    if (newPassword === confirmPassword) {
      registerUser();
    } else {
      alert("Passwords must match in order to register");
    }
  };

  return (
    <div className="text-center flex-col bg-beige-200 border-4 rounded">
      <h2 className="text-black-400 text-2xl f">Sign Up:</h2>
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="">
          <label htmlFor="username">Username:</label>
          <input
            className="text-black"
            name="username"
            type="text"
            placeholder="Set your username"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
            minLength="5"
            maxLength="20"
            required
          />
        </div>
        <div className="">
          <label htmlFor="password">Password:</label>
          <input
            className="text-black ml-2"
            name="password"
            type="password"
            placeholder="Choose a password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            minLength="5"
            maxLength="20"
            required
          />
        </div>
        <div className="">
          <label htmlFor="passwordConfirm">Re-type Password:</label>
          <input
            className="text-black"
            name="confirmPassword"
            type="password"
            placeholder="Retype password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength="5"
            maxLength="20"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-beige-200 border-2 rounded text-black-400"
        >
          Create Account
        </button>
      </form>
      <p>
        Thank you for joining
      </p>
    </div>
  );
};

export default Register;