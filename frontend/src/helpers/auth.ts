import { matchPath } from "react-router-dom";
import { routesConfig } from "../constants/routes";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const isPathPrivate = (path: string) => {
  return (
    routesConfig
      .filter((route) => route.isPrivate)
      .map((route) => route.path)
      .some((p) => matchPath(p, path)) &&
    !routesConfig
      .filter((route) => !route.isPrivate && route.path !== "*")
      .map((route) => route.path)
      .some((p) => matchPath(p, path))
  );
};
