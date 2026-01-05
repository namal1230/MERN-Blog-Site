const BASE_URL = "/email";
export const email= async (axiosInstance:any,data: { email: string ; description: string; })=>{
    try{
        const response = await axiosInstance.post(BASE_URL+"/send",data);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}

export const getAllEmail= async (axiosInstance:any,value:string)=>{
    try{
        const response = await axiosInstance.get(BASE_URL+"/get?status="+value);
        return response.data;
        
    }catch(err) {
        
        throw err;
    }
}