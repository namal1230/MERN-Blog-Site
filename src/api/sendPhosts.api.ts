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