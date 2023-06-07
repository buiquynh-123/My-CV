import instance from "./instance";
const getProjects = () => {
  return instance.get("projects");
};
export { getProjects };
