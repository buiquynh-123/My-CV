import { getCategory, getCategoryById } from "../../../api/category";
import MenuPortfolioPage from "../../../component/Menu/Menu";
import { useEffect, useState } from "react";
import { ICategory } from "../../../interface/category";
import { IProject, PropsProject } from "../../../interface/project";
import Projects from "../../../component/Projects/Projects";
import "./portfolio.css";
const PortfolioPage = ({ projects }: PropsProject) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [projectlist, setProjectlist] = useState<IProject[]>([]);
  console.log(projects);
  useEffect(() => {
    getCategory().then(({ data }) => {
      console.log(data);
      setCategories(data);
    });
  }, []);
  const onHandleClick = async (id: string) => {
    console.log(id);
    const { data } = await getCategoryById(id);
    console.log(data);
    setProjectlist(data.projects);
    if (data.name === "All") {
      setProjectlist(projects);
    }
  };
  console.log(projects);

  return (
    <div className="portfolio">
      <p className="portfolio__title">My Portfolio</p>
      <div className="portfolio__menu">
        <MenuPortfolioPage
          categories={categories}
          handleClick={onHandleClick}
        />
      </div>
      <Projects projects={projectlist} />
    </div>
  );
};

export default PortfolioPage;
