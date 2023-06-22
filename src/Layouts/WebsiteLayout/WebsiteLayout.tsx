/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./index.css";
import HeaderLayout from "../../components/Header/HeaderUser";
import FooterOnly from "../../components/Footer/FooterUser";
import { search } from "../../api/product";
import { IProduct } from "../../interface/product";
export const AppContext = React.createContext<{
  searchResult: IProduct[];
}>({
  searchResult: [],
});
const WebsiteLayout = () => {
  const [searchResult, setSearchResult] = useState<IProduct[]>([]);

  const handleSearch = async (value: any) => {
    try {
      const { data } = await search(value);
      console.log("data: " + data.cursor);
      setSearchResult(data.cursor);
    } catch (error) {
      alert("Đã xảy ra lỗi: " + error);
    }
  };

  return (
    <AppContext.Provider value={{ searchResult }}>
      <div>
        <HeaderLayout onSearch={handleSearch} />
        <main>
          <Outlet />
        </main>
        <FooterOnly />
      </div>
    </AppContext.Provider>
  );
};

export default WebsiteLayout;
