import { FC } from "react";
import { APPLICATION_STATUS, APPLICATION_STATUS_CONFIG } from "../constants/application-status"
import { Chip } from "@mui/material";

interface JobApplicationStatusChipProps {
    status: APPLICATION_STATUS
}

const JobApplicationStatusChip: FC<JobApplicationStatusChipProps> = ({ status }) => {
    const { label, color } = APPLICATION_STATUS_CONFIG[status];
    return <Chip label={label} color={color} size="small" />
}

export default JobApplicationStatusChip;