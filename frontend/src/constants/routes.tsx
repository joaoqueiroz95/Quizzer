import { Navigate } from "react-router-dom";
import EditQuiz from "../components/EditQuiz/EditQuiz";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import TakeQuiz from "../components/TakeQuiz/TakeQuiz";

export const routesConfig = [
  {
    path: "*",
    component: <Navigate to="/home" />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/home",
    isPrivate: true,
    hasNavBar: true,
    component: <Home />,
    title: "Home",
  },
  {
    path: "/create",
    isPrivate: true,
    hasNavBar: true,
    component: <EditQuiz isEdit={false} />,
    title: "Create Quiz",
    prevPath: "/home",
  },
  {
    path: "/:id",
    isPrivate: true,
    hasNavBar: true,
    component: <EditQuiz isEdit={true} />,
    title: "Edit Quiz",
    prevPath: "/home",
  },
  {
    path: "/take/:code",
    component: <TakeQuiz />,
  },
];
