import { axiosPrivate } from "./axiosPrivate";
const BASE_URL = "/phosts";
export const sendPhosts= async (axiosInstance:any,data: { name: string; email: string; code: string; body:Array<{type:string; value?:string}>; title:string; })=>{
    try{
        const response = await axiosInstance.post(BASE_URL+"/save-phost",data);
        return response.data;
        
    }catch(err) {
       
        throw err;
    }
}

export const getPublishedPhosts = async (axiosInstance:any,lastId: string | null, email:string) => {
  const url = lastId
    ? BASE_URL+`/published-phost?limit=10&lastId=${lastId}&userEmail=${email}`
    : BASE_URL+`/published-phost?limit=10&userEmail=${email}`;

  const response = await axiosInstance.get(url);
  return response.data;
};

export const downloadsPDF = async (axiosInstance:any,draftId: string | undefined) => {
  if (!draftId) throw new Error("Draft ID is required");

  const response = await axiosInstance.get(
    BASE_URL+`/download-phost?id=${draftId}`,
    {
      responseType: "blob", 
    }
  );

  return response.data;
};

export const reportPhost = async (axiosInstance:any,draftId: string | undefined, email:string, body:{ reportType:string,
        reason:string,
        description:string,
        frequency: string,
        evidence: string,
        acknowledge: boolean}) => {
  if (!draftId || !email) throw new Error("Draft ID and Email are required");

  const response = await axiosInstance.post(
    BASE_URL+`/report-phost?id=${draftId}&email=${email}`,
    body
  );

  return response.data;
};

export const sendReaction = async (axiosInstance:any,draftId: string | undefined, like:boolean,comment:string,username:string,profile:string) => {
  if (!draftId) throw new Error("Draft ID is required");

  const response = await axiosInstance.post(
     BASE_URL+`/save-reaction?id=${draftId}`,{like,comment,username,profile}
  );

  return response.data;
};

export const getReaction = async (axiosInstance:any,draftId: string | undefined,name:string) => {
  if (!draftId) throw new Error("Draft ID is required");

  const response = await axiosInstance.post(
     BASE_URL+`/get-reaction?id=${draftId}&name=${name}`
  );

  return response.data;
};

export const searchPhosts = async (axiosInstance:any,email: string | undefined,value:string) => {
  if (!email && !value) throw new Error("all values are required");

  const response = await axiosInstance.post(
     BASE_URL+`/find-phost?excludeEmail=${email}&search=${value}`
  );

  return response.data;
};

export const getNotifications = async (axiosInstance:any,username: string | undefined) => {
  if (!username) throw new Error("all values are required");

  const response = await axiosInstance.get(
     BASE_URL+`/get-notification?username=${username}`
  );

  return response.data;
};

export const setNotificationStatus= async (axiosInstance:any,username: string | undefined)=>{
  await axiosInstance.get(BASE_URL+`/set-notification?username=${username}`)
}