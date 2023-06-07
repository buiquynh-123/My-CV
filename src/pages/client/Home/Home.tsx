import getSkills from "../../../api/skill";
import Education from "../../../component/Education/Education";
import Projects from "../../../component/Projects/Projects";
import Skill from "../../../component/Skill/Skill";
import { PropsProject } from "../../../interface/project";
import { ISkill } from "../../../interface/skill";
import "./home.css";
import { useEffect, useState } from "react";
const HomePage = ({ projects }: PropsProject) => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  useEffect(() => {
    getSkills().then(({ data }) => {
      setSkills(data);
    });
  }, []);
  console.log(skills);

  return (
    <div className="container__about">
      <Education />
      <Skill skills={skills} />
      <Projects projects={projects} />
    </div>
  );
};

export default HomePage;
