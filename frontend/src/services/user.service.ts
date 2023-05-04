import httpRequest from "../helpers/httpRequest";

export const createUser = async (data: any) => {
  return httpRequest.post("users", data).then((res) => {
    return res.data.data;
  });
};
