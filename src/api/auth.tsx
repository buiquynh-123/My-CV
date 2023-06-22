import { IUser } from "../interface/user";
import instance from "./instance";
export const login = (user: IUser) => {
  return instance.post("/signin", user);
};

export const signup = (user: IUser) => {
  return instance.post("/signup", user);
};
export const authGoogle = (accessToken: string) => {
  return instance.post("/auth/google", { access_token: accessToken });
};
export const authFacebook = (accessToken: string) => {
  return instance.post("/auth/facebook", { access_token: accessToken });
};
