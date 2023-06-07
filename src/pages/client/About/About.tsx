import getSkills from "../../../api/skill";
import Education from "../../../component/Education/Education";
import Skill from "../../../component/Skill/Skill";
import { ISkill } from "../../../interface/skill";
import "./about.css";
import { useEffect, useState } from "react";
const AboutPage = () => {
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
    </div>
  );
};

export default AboutPage;
