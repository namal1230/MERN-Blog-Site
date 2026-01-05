import { axiosPrivate } from "./axiosPrivate"; 
const BASE_URL = "/phosts";
export const draftPhosts= async (axiosInstance:any,data: { name: string; email: string; value:string })=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/draft-phost?name="+data.name+"&email="+data.email+"&status="+data.value);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const getDraftPhost= async (axiosInstance:any,id:string)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/get-draft-phost?id="+id);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const getReportedPhost= async (axiosInstance:any,id:string)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/get-reported-phost?phostId="+id);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}


export const getDraftPhostByReportId = async (reportId: string) => {
  const response = await axiosPrivate.get(BASE_URL+`/get-draft-phost?id=${reportId}`);
  return response.data;
};

export const deletePhost= async (axiosInstance:any,id:string)=>{
    try{
        const response = await axiosInstance.delete(BASE_URL+"/delete-phost?id="+id);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const editPhost= async (axiosInstance:any,id:string,data: { name: string; email: string; code: string; body:Array<{type:string; value?:string}>; title:string; })=>{
    try{
        const response = await axiosInstance.put(BASE_URL+"/edit-phost?id="+id,data);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const getAllPendingPhost= async (axiosInstance:any,)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/get-all-pending");
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const approvePhosts= async (axiosInstance:any,id:string)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/get-phost?id="+id);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const deleteReport= async (axiosInstance:any,id:string)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/remove-report?phostId="+id);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}


export const rejectPhosts= async (axiosInstance:any,id:string)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/reject-phost?id="+id);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const getAllReportPhost= async (axiosInstance:any,)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/get-all-report");
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const getReportEmail= async (axiosInstance:any,id:string)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/get-report-email?id="+id);
        return response.data;
        
    }catch(err) {
       
        throw err;
    }
}