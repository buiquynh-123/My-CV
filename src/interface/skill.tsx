export interface ISkill {
  name: string;
  images: Array<{ [key: string]: string }>;
}

export interface SkillsPageProps {
  skills: ISkill[];
}
