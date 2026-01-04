import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { getAllEmail } from '../api/email.api';
import EmailContent from './EmailContent';
import { getAllPendingPhost, getAllReportPhost } from '../api/draftPhosts.api';
import AdminDraftBox from './AdminDraftBox';
import AdminHeader from '../components/AdminHeader';
import { Divider } from '@mui/material';
import AdminReportedPhost from './AdminReportedPhost';
import ReportUsers from './ReportUsers';

export interface emailTemplate {
    _id: string;
    email?: string;
    source: string;
    title?: string;
    body?: string;
    createdAt: string;
    updatedAt: string;
    userProfile:string;
}

export interface draft {
    _id: string;
    title: string;
    createdAt: string;
    image?: string | null;
}

const EmailBox: React.FC = () => {

    const [emails, setEmails] = useState<emailTemplate[]>([]);
    const [draftData, setdraftData] = useState<draft[]>([]);
    const [reportData, setreportData] = useState<draft[]>([]);

    const [params] = useSearchParams();
    const value = params.get("value");

    useEffect(() => {
        if(!value) return
        if(value === "login-issue"){
            const getEmails = async () => {
                const result = await getAllEmail(value)
                setEmails(result);
            }
            getEmails();
        }else if(value==="phost-upload"){
            const getPendingPhosts = async () => {
                const result = await getAllPendingPhost()
                console.log(result);
                setdraftData(result.data);
            }
            getPendingPhosts();
        }else if(value==="report-phost"){
             const getPendingPhosts = async () => {
                const result = await getAllReportPhost()
                console.log(result);
                setreportData(result.data);
            }
            getPendingPhosts();
        }
    }, [value]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AdminHeader/>
            <Typography sx={{ mt: 7, ml: 5 }} variant="h4" gutterBottom>
                Email Box
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%", ml: 8, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to="/admin-email?value=login-issue">
                    login-issue
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/admin-email?value=phost-upload">
                    phost-upload
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/admin-email?value=report-user">
                    report-user
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/admin-email?value=report-phost">
                    report-phost
                </NavLink>
            </Box>
            <Divider/>
            {value=="login-issue"&&emails.map((email) => (
                <EmailContent 
                key={email._id}
                emailId={email._id} 
                email={email.email || ""}
                source={email.source}
                title={email.title}
                body={email.body}
                createdAt={email.createdAt}
                updatedAt={email.updatedAt}
                profile={email.userProfile}  />
            ))}
            {value=="phost-upload"&&draftData.map((draft) => (
                <AdminDraftBox
                    key={draft._id}
                    draftId={draft._id}
                    title={draft.title}
                    createdAt={draft.createdAt}
                    image={draft.image}
                    status={value||""}
                />
            ))}

            {value=="report-phost"&&reportData.map((draft) => (
                <AdminReportedPhost
                    key={draft._id}
                    draftId={draft._id}
                    title={draft.title}
                    createdAt={draft.createdAt}
                    image={draft.image}
                    status={value||""}
                />
            ))}
            {value=="report-user"&&<ReportUsers/>}
        </Box>
    );
}

export default EmailBox;