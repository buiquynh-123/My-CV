import { PropsProject } from "../../interface/project";
import "./project.css";
const Projects = ({ projects }: PropsProject) => {
  console.log(projects);
  return (
    <div className="prject__list">
      <h2 className="project__title">My Projects</h2>
      {projects.map((project, index) => {
        return (
          <div className="project" key={index + 1}>
            <div className="project-content">
              <p className="project-content-name">{project.name}</p>
              <p className="project-content-desc">{project.description}</p>
              <p className="project-content-tech">{project.technology}</p>
              <button className="project-content-button">
                <a href={project.link_git}>Link git</a>
              </button>
            </div>
            <div className="project-image">
              <img className="project-img" src={project.images[0].url} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
