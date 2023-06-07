import instance from "./instance";
import { IUser } from "../interface/user";
const getUser = (id: string) => {
  return instance.get(`users/${id}`);
};
const updateUser = (user: IUser, id: string) => {
  return instance.put(`users/${id}`, user);
};
const addUser = (user: IUser) => {
  return instance.post("users", user);
};
export { getUser, updateUser, addUser };
