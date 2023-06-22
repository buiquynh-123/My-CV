import instance from "./instance";

export const cloudinaryUpload = (fileToUpload: FormData) => {
  return instance
    .post("/cloudinary-upload", fileToUpload)
    .then((res: { data: any }) => res.data)
    .catch((err: any) => console.log(err));
};

export default cloudinaryUpload;
