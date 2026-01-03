import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../utilities/store/store';
import { NavLink, useSearchParams } from 'react-router-dom';
import DraftBox from './DraftBox';
import { draftPhosts } from "../api/draftPhosts.api";
import { Header } from '../components/Header';

export interface draft {
    _id: string;
    title: string;
    createdAt: string;
    image?: string | null;
}

const DraftPage: React.FC = () => {

    const name = useSelector((state: RootState) => state.persistedReducer.name);
    const email = useSelector((state: RootState) => state.persistedReducer.email);
    const [draftData, setdraftData] = useState<draft[]>([]);

    const [params] = useSearchParams();
    const value = params.get("value");

    useEffect(() => {
        console.log("log is worked", name, email);

        const getDrafts = async () => {
            if(!value || !name) return
            const result = await draftPhosts({ name, email, value })
            console.log(result);
            setdraftData(result);
        }
        getDrafts();
    }, [value]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header action={undefined}/>
            
            <Typography sx={{ mt: 7, ml: 5 }} variant="h4" gutterBottom>
                Stories
            </Typography>
            <div>

            </div>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%", ml: 8, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to="/stories?value=pending">
                    Draft
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/stories?value=published">
                    Published
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/stories?value=unlisted">
                    Unlisted
                </NavLink>
            </Box>
            <hr />
            {draftData.map((draft) => (
                <DraftBox
                    key={draft._id}
                    draftId={draft._id}
                    title={draft.title}
                    createdAt={draft.createdAt}
                    image={draft.image}
                    status={value||""}
                />
            ))}
        </Box>
    );
}

export default DraftPage;