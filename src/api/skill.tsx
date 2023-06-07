import instance from "./instance";
const getSkills = () => {
  return instance.get("skills");
};

export default getSkills;
