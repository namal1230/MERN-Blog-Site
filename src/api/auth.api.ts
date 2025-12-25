import axios from "axios"; 

export const login= async (data: { name: string; email: string; id: string; profile:string; })=>{
    try{
        const response = await axios.post("http://localhost:3000/customer/login-customer",data);
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}