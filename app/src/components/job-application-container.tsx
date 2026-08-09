import { Box, Button, Stack, Typography } from "@mui/material";
import JobApplicationTable from "./job-application-table";
import { createClient } from "../utils/supabase/server";
import { cookies } from 'next/headers'
import JobApplicationCreateButton from "./job-application-create-button";

const JobApplicationContainer = async () => {
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore);

    const { data: applications, error } = await supabase
        .from('job-application')
        .select('*')
        .order('applied_date', { ascending: false });

    if (error) throw error;

    return <Stack spacing={2} sx={{ padding: '18px 6px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ flexGrow: 1 }}>Total Application: {applications.length}</Typography>
            <JobApplicationCreateButton />
        </Box>
        <JobApplicationTable applications={applications} />
    </Stack>
}

export default JobApplicationContainer;