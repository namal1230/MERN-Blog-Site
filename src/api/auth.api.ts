import axios from "axios"; 

export const login= async (data: { name?: string | undefined; email?: string | undefined; id?: string | undefined; profile?:string | undefined; })=>{
    try{
        const response = await axios.post("https://mern-be-sigma.vercel.app/customer/login-customer",data, {
        withCredentials: true,
      });
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}