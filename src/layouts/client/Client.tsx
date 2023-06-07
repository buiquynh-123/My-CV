/* eslint-disable react-refresh/only-export-components */
import Header from "../../component/Header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./client.css";
import React, { useEffect, useState } from "react";
import { getUser } from "../../api/user";
import { IUser } from "../../interface/user";

export const userContext = React.createContext({});
const ClientLayout = () => {
  const [user, setUser] = useState<IUser>();
  const id = "6474c29a94169e7fe4066fd6";
  useEffect(() => {
    getUser(id).then(({ data }) => {
      setUser(data);
      console.log(data);
    });
  }, []);
  console.log(user);
  return (
    <userContext.Provider value={{ user }}>
      <div className="container__client">
        <div className="container__header">
          <Header />
        </div>
        <div className="container_side_main">
          <Sidebar />

          <main className="container__main">
            <Outlet />
          </main>
        </div>
      </div>
    </userContext.Provider>
  );
};

export default ClientLayout;
