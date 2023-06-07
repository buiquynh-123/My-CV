export interface ICategory {
  _id?: string;
  name: string;
}
export interface ICategoryProps {
  categories: ICategory[];
  handleClick: (id: string) => void;
}
