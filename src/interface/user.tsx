export interface IUser {
  _id?: string;
  name: string;
  description: string;
  images: Array<{ [key: string]: string }>;
  majob: string;
  link_git: string;
  link_fb: string;
  address: string;
  email: string;
  phone: string;
  date_of_birth?: Date;
}

export interface UserPageProps {
  user: IUser;
}
