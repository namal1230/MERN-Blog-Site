import axios from "axios"; 

export const email= async (data: { email: string ; description: string; })=>{
    try{
        const response = await axios.post("http://localhost:3000/email/send",data);
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}