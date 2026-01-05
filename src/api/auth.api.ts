import axios from "axios"; 

export const login= async (data: { name?: string | undefined; email?: string | undefined; id?: string | undefined; profile?:string | undefined; })=>{
    try{
        const response = await axios.post("http://localhost:3000/customer/login-customer",data, {
        withCredentials: true,
      });
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}