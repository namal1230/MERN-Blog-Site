import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, CardContent, Chip, Divider, Grid, IconButton, Stack, Typography, } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import { useSearchParams } from "react-router-dom";
import { getInfobyName } from "../api/user.api";
import { useSelector } from "react-redux";
import type { RootState } from "../utilities/store/store";
import { followUser, followUserCount } from "../api/user.api";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
export interface User {
  name: string;
  email: string;
  bio?: string;
  experienceYears?: string;
  portfolioUrl?: string;
  anotherUrl?: string;
  githubUrl?: string;
  jobTitle?: string;
  linkdinUrl?: string;
  skills?: string[];
}


const UserProfile: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [followers, setFollowers] = useState<number>(0);
  const [search] = useSearchParams();
  const names = search.get("name");

  const currentUser: string = useSelector((state: RootState) => state.persistedReducer.name) || "";

  const [profile, setprofile] = useState<string>("");

  const followUsers = async () => {
    
    if (names && currentUser) {
      try{
      await followUser(axiosPrivate, names, currentUser);
      alert("You are now Followed this User.");
      }catch(err){
        alert("User Followed Failed.");
      }
    }
  }


  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    bio: "",
    experienceYears: "",
    portfolioUrl: "",
    anotherUrl: "",
    githubUrl: "",
    jobTitle: "",
    linkdinUrl: "",
    skills: [],
  });

  useEffect(() => {
    if (!names) return;

    const getInfo = async () => {
      const response = await getInfobyName(axiosPrivate, names);

      setForm({
        name: response.user.name,
        email: response.user.email,
        bio: response.user.bio,
        experienceYears: response.user.experienceYears,
        portfolioUrl: response.user.portfolioUrl.startsWith("/") ? response.user.portfolioUrl.slice(1) : response.user.portfolioUrl,
        anotherUrl: response.user.anotherUrl.startsWith("/") ? response.user.anotherUrl.slice(1) : response.user.anotherUrl,
        githubUrl: response.user.githubUrl.startsWith("/") ? response.user.githubUrl.slice(1) : response.user.githubUrl,
        jobTitle: response.user.jobTitle,
        linkdinUrl: response.user.linkdinUrl.startsWith("/") ? response.user.linkdinUrl.slice(1) : response.user.linkdinUrl,
        skills: response.user.skills,
      });
      setprofile(response.user.profileUrl);
    };

    getInfo();

  }, [name]);

  useEffect(() => {
    if (!form.name) return;

    const setFollowersCount = async () => {
      const response = await followUserCount(axiosPrivate, form.name);
      
      setFollowers(response.followers);
    };

    setFollowersCount();
  }, [form.name]);


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ position: 'relative' }}>
          <Avatar
            src={profile}
            sx={{ width: 80, height: 80, mx: "auto", ml: 2 }}
          />
          <Box sx={{ pt: 2, pl: 4 }}>
            <Typography variant="h5" fontWeight={600}>
              {form.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={1}>
              {form.jobTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {followers} Followers
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ pl: 0 }}>
          <Button sx={{ color: "white", backgroundColor: "#1976D2", mt: 2 }} onClick={followUsers}>Follow</Button>
        </Box>
        <Stack direction="row" justifyContent="center" sx={{ pl: 9 }} spacing={1} mt={1}>
          {form.githubUrl != "" ? <IconButton component="a" href={form.githubUrl} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </IconButton> : <h1></h1>}
          {form.linkdinUrl != "" ? <IconButton component="a" href={form.linkdinUrl} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </IconButton> : <h1></h1>}
          {form.anotherUrl != "" ? <IconButton component="a" href={form.anotherUrl} target="_blank" rel="noopener noreferrer">
            <LanguageIcon />
          </IconButton> : <h1></h1>}
        </Stack>

        <Grid sx={{ xs: 12, md: 8, mt: 3 }}>
          <Stack spacing={3}>
            {/* Bio */}
            <Box>
              <Typography variant="h6" fontWeight={600} mb={1}>
                {form.bio}
              </Typography>
            </Box>

            <Divider />

            {/* Experience */}
            <Box>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Experience
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {form.experienceYears ? (
                  <Chip label={`${form.experienceYears} Years Experience`} color="primary" />
                ) : (
                  <Chip label="No Experience Shown" />
                )}

                {form.skills?.map((skill) => (
                  <Chip key={skill} label={skill} />
                ))}

              </Stack>
            </Box>

            <Divider />

            <Box>
              <Button
                variant="outlined"
                size="medium"
                component="a"
                href={form.portfolioUrl}
                target="_blank"
                disabled={!form.portfolioUrl}
              >
                Visit Portfolio
              </Button>
            </Box>
          </Stack>
        </Grid>
      </CardContent>
    </Box>
  );
};

export default UserProfile;