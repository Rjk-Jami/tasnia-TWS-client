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
import InstructorHome from "../pages/DashBoard/InstructorHome/InstructorHome";
import AddAClass from "../pages/DashBoard/AddAClass/AddAClass";
import MyClasses from "../pages/DashBoard/MyClasses/MyClasses";
import ManageClasses from "../pages/DashBoard/ManageClasses/ManageClasses";
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
          path:'instructorhome',
          element:<InstructorHome></InstructorHome>
        },
        {
          path:'manageUsers',
          element:<ManageUsers></ManageUsers>
        },
        {
          path:'manageClasses',
          element:<ManageClasses></ManageClasses>
        },
        {
          path:'addAClass',
          element:<AddAClass></AddAClass>
        },
        {
          path:'myClasses',
          element:<MyClasses></MyClasses>
        },
      ]
    }
  ]);

  export default router;