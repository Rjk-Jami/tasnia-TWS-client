import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Classes from "../pages/Classes/Classes";
import InstructorsMentor from "../pages/InstructorsMentor/InstructorsMentor";
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
  ]);

  export default router;