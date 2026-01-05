import { Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeAuth } from '../utilities/slices/loginSlice'
import { signOut } from "firebase/auth";
import { authFire } from "../firebase/firebaseConfig";

export const SignOut: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clearAuthorities = async () => {
        try {
            dispatch(removeAuth())
            await signOut(authFire);
            navigate(-1);
            
        } catch (error) {
            
        }
    }

    return (
        <>
            <Button onClick={() => clearAuthorities()}>Sign out</Button>
        </>
    )
}


