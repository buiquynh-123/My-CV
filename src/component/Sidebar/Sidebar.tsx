/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./sidebar.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../layouts/client/Client";
import { IUser } from "../../interface/user";
const Sidebar = () => {
  // const { user } = useContext(userContext);
  const { user } = useContext(userContext as React.Context<any>);
  const [isUser, setIsUser] = useState<IUser | null>(null);
  useEffect(() => {
    setIsUser(user);
  }, [user]);
  console.log(isUser);
  return (
    <div>
      <div className="card">
        <div className="card__img">
          <img src={isUser?.images[0].url} alt="" />
        </div>
        <h2 className="card__name">{isUser?.name}</h2>
        <p>{isUser?.majob}</p>
        <div className="card__social">
          <a href={isUser?.link_fb} className="card__social-link icon--fb">
            <i className="fa-brands fa-facebook-square"></i>
          </a>

          <a href="" className="card__social-link icon--youtube">
            <i className="fa-brands fa-youtube"></i>
          </a>

          <a href="#" className="card__social-link icon--instagram">
            <i className=" fa-brands fa-instagram"></i>
          </a>

          <a href={isUser?.link_git} className="card__social-link icon--git">
            <i className="fa-brands fa-github-square"></i>
          </a>
        </div>
        <button>
          <a href="/Bui-Thi-Diem-Quynh-TopCV.vn-300523.175644.pdf" download>
            Contact Me
          </a>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
