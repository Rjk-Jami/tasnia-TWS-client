import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Classes from "../pages/Classes/Classes";
import InstructorsMentor from "../pages/InstructorsMentor/InstructorsMentor";
import DashBoard from "../layouts/DashBoard";
import PrivateRoutes from "./PrivateRoutes";
import UserHome from "../pages/DashBoard/UserHome/UserHome";
import AdminHome from "../pages/DashBoard/AdminHome/AdminHome";
import ManageUsers from "../pages/DashBoard/ManageUsers/ManageUsers";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    //   errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/classes",
          element: <Classes></Classes>,
        },
        {
          path: "/instructors",
          element: <InstructorsMentor></InstructorsMentor>,
        },
      ],
    },
    {
      path:"dashboard",
      element: <PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
      children: [
        {
          path:'userhome',
          element:<UserHome></UserHome>
        },
        {
          path:'adminhome',
          element:<AdminHome></AdminHome>
        },
        {
          path:'manageUsers',
          element:<ManageUsers></ManageUsers>
        },
      ]
    }
  ]);

  export default router;