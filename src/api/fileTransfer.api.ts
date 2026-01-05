import { axiosPrivate } from "./axiosPrivate";

const BASE_URL = "/api";
export const fileTransfer= async (axiosInstance:any,data: { file:File | null })=>{
    try{
        if(!data.file) return;

        const formData = new FormData();

        if(data.file.type.startsWith("image")){
            formData.append("image",data.file);
        
            const response = await axiosInstance.post(BASE_URL+"/upload/image",formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
            
        }

        if(data.file.type.startsWith("video")){
            formData.append("vedio",data.file);

             const response = await axiosInstance.post(BASE_URL+"/upload/video",formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
        }
        
    }catch(err) {
        
        throw err;
    }
}