import httpRequest from "../helpers/httpRequest";

export const login = async (email: string, password: string) => {
  return httpRequest
    .post("auth/login", {
      email,
      password,
    })
    .then((response) => {
      const { accessToken, user } = response.data.data;
      if (response.data.data.accessToken) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return response.data.user;
    });
};
