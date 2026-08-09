'use client'
import { Fragment, useState } from "react";
import { Button } from "@mui/material";
import JobApplicationFormDialog from "./job-application-form-dialog";

const JobApplicationCreateButton = () => {
    const [openFormDialog, setOpenFormDialog] = useState(false);

    return <Fragment>
        <Button variant="contained" onClick={() => setOpenFormDialog(true)}>+ Add new</Button>
        {openFormDialog && <JobApplicationFormDialog handleClose={() => setOpenFormDialog(false)} />}
    </Fragment>
}

export default JobApplicationCreateButton;