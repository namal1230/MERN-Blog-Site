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

export const reportPhost = async (draftId: string | undefined, email:string, body:{ reportType:string,
        reason:string,
        description:string,
        frequency: string,
        evidence: string,
        acknowledge: boolean}) => {
  if (!draftId || !email) throw new Error("Draft ID and Email are required");

  const response = await axios.post(
    `http://localhost:3000/phosts/report-phost?id=${draftId}&email=${email}`,
    body
  );

  return response.data;
};

export const sendReaction = async (draftId: string | undefined, like:boolean,comment:string,username:string,profile:string) => {
  if (!draftId) throw new Error("Draft ID is required");

  const response = await axios.post(
     `http://localhost:3000/phosts/save-reaction?id=${draftId}`,{like,comment,username,profile}
  );

  return response.data;
};

export const getReaction = async (draftId: string | undefined,name:string) => {
  if (!draftId) throw new Error("Draft ID is required");

  const response = await axios.post(
     `http://localhost:3000/phosts/get-reaction?id=${draftId}&name=${name}`
  );

  return response.data;
};

export const searchPhosts = async (email: string | undefined,value:string) => {
  if (!email && !value) throw new Error("all values are required");

  const response = await axios.post(
     `http://localhost:3000/phosts/find-phost?excludeEmail=${email}&search=${value}`
  );

  return response.data;
};

export const getNotifications = async (username: string | undefined) => {
  if (!username) throw new Error("all values are required");

  const response = await axios.get(
     `http://localhost:3000/phosts/get-notification?username=${username}`
  );

  return response.data;
};

export const setNotificationStatus= async (username: string | undefined)=>{
  await axios.get( `http://localhost:3000/phosts/set-notification?username=${username}`)
}