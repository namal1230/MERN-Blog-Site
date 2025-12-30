import axios from "axios"; 

export const draftPhosts= async (data: { name: string; email: string; value:string })=>{
    try{
        const response = await axios.get("http://localhost:3000/phosts/draft-phost?name="+data.name+"&email="+data.email+"&status="+data.value);
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}

export const getDraftPhost= async (id:string)=>{
    try{
        const response = await axios.get("http://localhost:3000/phosts/get-draft-phost?id="+id);
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}

export const deletePhost= async (id:string)=>{
    try{
        const response = await axios.delete("http://localhost:3000/phosts/delete-phost?id="+id);
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}

export const editPhost= async (id:string,data: { name: string; email: string; code: string; body:Array<{type:string; value?:string}>; title:string; })=>{
    try{
        const response = await axios.put("http://localhost:3000/phosts/edit-phost?id="+id,data);
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}

export const getAllPendingPhost= async ()=>{
    try{
        const response = await axios.get("http://localhost:3000/phosts/get-all-pending");
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}

export const approvePhosts= async (id:string)=>{
    try{
        const response = await axios.get("http://localhost:3000/phosts/approve-phost?id="+id);
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}

export const rejectPhosts= async (id:string)=>{
    try{
        const response = await axios.get("http://localhost:3000/phosts/reject-phost?id="+id);
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}

export const getAllReportPhost= async ()=>{
    try{
        const response = await axios.get("http://localhost:3000/phosts/get-all-report");
        return response.data;
        
    }catch(err) {
        console.error(err);
        throw err;
    }
}