import "./skill.css";
import { SkillsPageProps } from "../../interface/skill";
const Skill = ({ skills }: SkillsPageProps) => {
  console.log(skills);
  return (
    <div className="container__skill">
      <div className="container__skill-title">My skills</div>

      <div className="container__skill-list">
        {skills.map((skill, index) => {
          return (
            <div className="container__skills-item" key={index + 1}>
              <div className="container__skills-item-img">
                <img className="image" src={skill.images[0].url} alt="" />
              </div>
              <div className="container__skills-item-name">{skill.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skill;
