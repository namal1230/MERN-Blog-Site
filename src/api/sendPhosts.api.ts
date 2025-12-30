import axios from "axios"; 

export const sendPhosts= async (data: { name: string; email: string; code: string; body:Array<{type:string; value?:string}>; title:string; })=>{
    try{
        const response = await axios.post("http://localhost:3000/phosts/save-phost",data);
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}

export const getPublishedPhosts = async (lastId: string | null, email:string) => {
  const url = lastId
    ? `http://localhost:3000/phosts/published-phost?limit=10&lastId=${lastId}&userEmail=${email}`
    : `http://localhost:3000/phosts/published-phost?limit=10&userEmail=${email}`;

  const response = await axios.get(url);
  return response.data;
};

export const downloadsPDF = async (draftId: string | undefined) => {
  if (!draftId) throw new Error("Draft ID is required");

  const response = await axios.get(
    `http://localhost:3000/phosts/download-phost?id=${draftId}`,
    {
      responseType: "blob", 
    }
  );

  return response.data;
};