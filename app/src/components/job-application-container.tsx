import { Box, Button, Stack, Typography } from "@mui/material";
import JobApplicationTable from "./job-application-table";
import { createClient } from "../utils/supabase/server";
import { cookies } from 'next/headers'
import JobApplicationCreateButton from "./job-application-create-button";
import SnackbarProvider from "../providers/snackbar-provider";
import type { JobApplication } from "../types/job-application";

const JobApplicationContainer = async () => {
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore);

    const { data: applications, error } = await supabase
        .from('job-application')
        .select('*')
        .order('applied_date', { ascending: false })
        .returns<JobApplication[]>();

    if (error) throw error;

    return <SnackbarProvider>
        <Stack spacing={2} sx={{ padding: '18px 6px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ flexGrow: 1 }}>Total Application: {applications.length}</Typography>
                <JobApplicationCreateButton />
            </Box>
            <JobApplicationTable applications={applications} />
        </Stack>
    </SnackbarProvider>
}

export default JobApplicationContainer;