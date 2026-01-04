import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Divider,
} from "@mui/material";
import { getReportEmail } from "../api/draftPhosts.api";

interface ReportProps {
    id: string;
    status:string;
}

interface Report {
    acknowledge: string;
    createdAt: string;
    description: string;
    evidence: string;
    frequency: string;
    phostId: string;
    reason: string;
    reportType: string;
    reporterEmail: string;
    status: boolean;
    updatedAt: string;
    _id: string;
}

const ViewReportEmail: React.FC<ReportProps> = ({ id,status }) => {
    const [report, setReport] = useState<Report | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchReport = async () => {
            const response = await getReportEmail(id);
            console.log("email ->", response);
            setReport(response.data);
        };

        fetchReport();
    }, [id]);

    const InfoRow = ({ label, value }: { label: string; value: string }) => (
        <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body2">{value}</Typography>
        </Box>
    );

    if (!report) {
        return (
            <Box sx={{ width: 400, p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Loading report...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: 400, p: 2 }}>
            <Typography variant="h6">Phost Report Details</Typography>
            <Divider sx={{ mb: 2 }} />
            <InfoRow label="Phost ID" value={report.phostId} />
            <InfoRow label="Reported By" value={report.reporterEmail} />
            <InfoRow label="Report Type" value={report.reportType} />
            <InfoRow label="Reason" value={report.reason} />
            <InfoRow label="Frequency" value={report.frequency} />
            <InfoRow label="Description" value={report.description} />
            <InfoRow
                label="Evidence"
                value={report.evidence || "No evidence provided"}
            />
        </Box>
    );
};

export default ViewReportEmail;
