import axios from "axios";

export const searchImages = async (query: string) => {
  const res = await axios.get(
    `http://localhost:3000/api/images/search?q=${query}`
  );
  return res.data.results;
};
