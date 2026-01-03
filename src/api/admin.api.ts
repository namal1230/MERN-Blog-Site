import axios from "axios"; 

export const getDashBoardStats= async ()=>{
    try{
        const response = await axios.get("http://localhost:3000/admin/get-stats");
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}

export const sendResolveLogin = async (emailId:string, message:string)=>{
    try{
        const response = await axios.get("http://localhost:3000/admin/resole-login?emailId="+emailId+"&message="+message);
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}