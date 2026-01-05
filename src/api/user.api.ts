import { axiosPrivate } from "./axiosPrivate";
const BASE_URL = "/customer";
export const saveInfo = async (axiosInstance:any,data: {name: string;email: string;bio?: string;jobTitle?:string;
    experienceYears?: string;portfolioUrl?: string; githubUrl?:string;linkdinUrl?:string;
    anotherUrl?:string;skills?: string[];profileUrl?: string;
}) => {
    try {
        const response = await axiosInstance.post(BASE_URL+"/save-info",data);
        return response.data;
    } catch (err) {
      
        throw err;
    }
};

export const getInfo = async (axiosInstance:any,email:string) => {
    try {
        const response = await axiosInstance.get(BASE_URL+"/get-info?email="+email);
        return response.data;
    } catch (err) {
       
        throw err;
    }
};

export const getInfobyName = async (axiosInstance:any,name:string) => {
    try {
        const response = await axiosInstance.get(BASE_URL+"/get-name-info?name="+name);
        return response.data;
    } catch (err) {
       
        throw err;
    }
};

export const followUser = async (axiosInstance:any,name:string,currentUser:string)=>{
    try {
        const response = await axiosInstance.get(BASE_URL+"/follow-user?name="+name+"&currentUser="+currentUser);
        return response.data;
    } catch (err) {
       
        throw err;
    }
}

export const followUserCount = async (axiosInstance:any,name:string)=>{
    try {
        const response = await axiosInstance.get(BASE_URL+"/follow-user-count?name="+name);
        return response.data;
    } catch (err) {
    
        throw err;
    }
}

export const getFollowingPhosts = async (axiosInstance:any,name:string)=>{
     try {
        const response = await axiosInstance.get(BASE_URL+"/get-following-phosts?currentUser="+name);
        return response.data;
    } catch (err) {
     
        throw err;
    }
}