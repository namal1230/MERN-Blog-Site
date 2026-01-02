import { current } from "@reduxjs/toolkit";
import axios from "axios"; 

export const saveInfo = async (data: {name: string;email: string;bio?: string;jobTitle?:string;
    experienceYears?: string;portfolioUrl?: string; githubUrl?:string;linkdinUrl?:string;
    anotherUrl?:string;skills?: string[];profileUrl?: string;
}) => {
    try {
        const response = await axios.post("http://localhost:3000/customer/save-info",data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getInfo = async (email:string) => {
    try {
        const response = await axios.get("http://localhost:3000/customer/get-info?email="+email);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getInfobyName = async (name:string) => {
    try {
        const response = await axios.get("http://localhost:3000/customer/get-name-info?name="+name);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const followUser = async (name:string,currentUser:string)=>{
    try {
        const response = await axios.get("http://localhost:3000/customer/follow-user?name="+name+"&currentUser="+currentUser);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const followUserCount = async (name:string)=>{
    try {
        const response = await axios.get("http://localhost:3000/customer/follow-user-count?name="+name);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}