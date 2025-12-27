import axios from "axios"; 

export const fileTransfer= async (data: { file:File | null })=>{
    try{
        if(!data.file) return;

        const formData = new FormData();

        if(data.file.type.startsWith("image")){
            formData.append("image",data.file);
        
            const response = await axios.post("http://localhost:3000/api/upload/image",formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
            
        }

        if(data.file.type.startsWith("video")){
            formData.append("vedio",data.file);

             const response = await axios.post("http://localhost:3000/api/upload/video",formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
        }
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}