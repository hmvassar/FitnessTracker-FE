import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Root from './routes/root.js';
import Home from './components/Home';
import Login from "./components/Login";
import Register from "./components/Register";
import Routines from "./components/Routines";
import Activities from "./components/Activities";
import CreateActivity from './components/createActivity';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/routines", element: <Routines /> },
      { path: "/activities", element: <Activities /> },
      { path: "/activities/createActivity", element: <CreateActivity /> },
      // { path: "/", element: <Home /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,)