import React, { useState, useEffect } from "react";
import Navigation from "../components/NavBar";
import { Outlet, UNSAFE_DataRouterStateContext, useNavigate } from "react-router-dom";


const Root = () => {
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [user, setUser] = useState("");
     const [token, setToken] = useState("");

    const checkLocalStorage = () => {
    const checkToken = localStorage.getItem("token");
    const checkUser = localStorage.getItem("user");
    if (checkToken && checkUser) {
      console.log(checkUser, checkToken);
      setToken(checkToken);
      setUser(checkUser);
      setIsLoggedIn(true);
    }
  }
  useEffect(() => {
    checkLocalStorage()
  })
     
    return (
      <>
        <Navigation
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
          setUser={setUser}
        />
        <div>
          <Outlet
            context={{
              isLoggedIn,
              setIsLoggedIn,
              user,
              setUser,
              token,
              setToken,
              checkLocalStorage
            }}
          />
        </div>
      </>
    );
}

export default Root;