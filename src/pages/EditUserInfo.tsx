import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, CardContent, Stack, TextField, Typography } from "@mui/material";
import { saveInfo, getInfo } from "../api/user.api";
import type { RootState } from "../utilities/store/store";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

export interface User {
    name: string;
    email: string;
    bio?: string;
    jobTitle?: string;
    experienceYears?: string;
    portfolioUrl?: string;
    githubUrl?: string;
    linkdinUrl?: string;
    anotherUrl?: string;
    skills?: string;
}


const EditUserInfo: React.FC = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [form, setForm] = useState<User>({
        name: "",
        email: "",
        bio: "",
        jobTitle: "",
        experienceYears: "",
        portfolioUrl: "",
        githubUrl: "",
        linkdinUrl: "",
        anotherUrl: "",
        skills: "",
    });

    const image = useSelector((state: RootState) => state.persistedReducer.profile);
    const email = useSelector((state: RootState) => state.persistedReducer.email);

    const [profile, setprofile] = useState<string>("");

    useEffect(() => {
        const getInfoReq = async () => {
            const response = await getInfo(axiosPrivate, email);

            setForm({
                name: response.user.name,
                email: response.user.email,
                bio: response.user.bio,
                jobTitle: response.user.jobTitle,
                experienceYears: response.user.experienceYears,
                portfolioUrl: response.user.portfolioUrl,
                githubUrl: response.user.githubUrl,
                linkdinUrl: response.user.linkdinUrl,
                anotherUrl: response.user.anotherUrl,
                skills: response.user.skills?.join(", ") || ""

            })
            setprofile(response.user.profileUrl);
        }
        getInfoReq();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                name: form.name,
                email: form.email,
                bio: form.bio || "",
                jobTitle: form.jobTitle || "",
                experienceYears: form.experienceYears || "",
                portfolioUrl: form.portfolioUrl || "",
                githubUrl: form.githubUrl || "",
                linkdinUrl: form.linkdinUrl || "",
                anotherUrl: form.anotherUrl || "",
                skills: form.skills
                    ?.split(",")
                    .map((s) => s.trim())
                    .filter((s) => s) || [],
                profileUrl: image || ""
            };

            await saveInfo(axiosPrivate, payload);
            alert("User info saved!");
            navigate("/")
        } catch (error) {
            alert("Failed to save user info.");
        }
    };


    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f4f6f8",
                display: "flex",
                p: 2,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CardContent sx={{ p: 2, width: 600 }}>
                <Stack direction="row" justifyContent="center" spacing={1}>
                    <Avatar
                        src={profile}
                        sx={{ width: 80, height: 80, mx: "auto", ml: 2 }}
                    />
                    <Box sx={{ pt: 2, pl: 4 }}>
                        <Typography variant="h5" fontWeight={600}>
                            {form.name}
                        </Typography>
                        <Typography fontWeight={600}>Edit Profile Info</Typography>
                    </Box>
                </Stack>

                <Box sx={{ mt: 6 }}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                        value={form.name}
                        disabled
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                        value={form.email}
                        disabled
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Bio"
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                    />

                    <TextField
                        fullWidth
                        label="Job Title"
                        name="jobTitle"
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                        value={form.jobTitle}
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Experience (Years)"
                        name="experienceYears"
                        value={form.experienceYears}
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                    />

                    <TextField
                        fullWidth
                        label="Portfolio URL"
                        name="portfolioUrl"
                        value={form.portfolioUrl}
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                    />

                    <TextField
                        fullWidth
                        label="Github URL"
                        name="githubUrl"
                        value={form.githubUrl}
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                    />

                    <TextField
                        fullWidth
                        label="Linkdin URL"
                        name="linkdinUrl"
                        value={form.linkdinUrl}
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                    />

                    <TextField
                        fullWidth
                        label="Another Account URL"
                        name="anotherUrl"
                        value={form.anotherUrl}
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                    />

                    <TextField
                        fullWidth
                        label="Skills (comma separated)"
                        name="skills"
                        value={form.skills}
                        onChange={handleChange}
                    />
                </Box>

                <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
                    <Button variant="outlined" onClick={()=>navigate("/")}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Stack>
            </CardContent>
        </Box>
    );
};

export default EditUserInfo;
