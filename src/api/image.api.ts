import { axiosPrivate } from "./axiosPrivate";

export const searchImages = async (axiosInstance:any,query: string) => {
  const res = await axiosInstance.get(
    `/api/images/search?q=${query}`
  );
  return res.data.results;
};
