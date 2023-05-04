import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import { routesConfig } from "./constants/routes";
import { styled } from "@mui/system";

export const ContentRoot = styled("div")(({ theme }) => ({
  margin: "40px auto 10px auto",
  paddingRight: "40px",
  paddingLeft: "40px",
  maxWidth: "700px",
  height: "calc(100% - 115px)",
  [theme.breakpoints.down("sm")]: {
    margin: "20px auto 10px auto",
    paddingRight: "20px",
    paddingLeft: "20px",
  },
}));

function AppRoutes() {
  const navigate = useNavigate();

  const goToPrevPage = (prevPath: string) => () => {
    navigate(prevPath);
  };

  return (
    <Routes>
      {routesConfig.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <>
              {route.hasNavBar && (
                <Header
                  title={route.title}
                  handleClickBack={
                    route.prevPath ? goToPrevPage(route.prevPath) : undefined
                  }
                />
              )}
              <ContentRoot>{route.component}</ContentRoot>
            </>
          }
        />
      ))}
    </Routes>
  );
}

export default AppRoutes;
