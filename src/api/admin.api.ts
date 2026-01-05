const BASE_URL = "/admin";
export const getDashBoardStats= async (axiosInstance:any)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/get-stats",);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const sendResolveLogin = async (axiosInstance:any,emailId:string, message:string)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/resole-login?emailId="+emailId+"&message="+message);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const getReportedUser = async (axiosInstance:any,)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/get-reported-users");
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const rejectedUserAccount= async (axiosInstance:any,name:string,reportId:string)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/rejected-user?name="+name+"&reportId="+reportId);
        return response.data;
        
    }catch(err) {
       
        throw err;
    }
}