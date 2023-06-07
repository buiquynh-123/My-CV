/* eslint-disable @typescript-eslint/ban-types */
export interface IProject {
  category_id: string;
  createdAt: Date;
  deleted: Boolean;
  deletedAt: Date;
  description: string;
  images: Array<{ [key: string]: string }>;
  member_number: number;
  name: string;
  technology: string;
  updatedAt: Date;
  link_git: string;
}
export interface PropsProject {
  projects: IProject[];
}
