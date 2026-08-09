import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FC } from "react";
import { useForm, Controller } from 'react-hook-form'
import { APPLICATION_STATUS_CONFIG } from "../constants/application-status";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { createClient } from "../utils/supabase/client";

type FormValues = {
    company: string,
    role: string,
    status: string,
    applied_date: Date
}

interface JobApplicationFormDialog {
    handleClose: () => void;
}

const JobApplicationFormDialog: FC<JobApplicationFormDialog> = ({ handleClose }) => {
    const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: {
            company: '',
            role: '',
            status: '',
            applied_date: new Date()
        }
    });

    const createTracking = async (formValue: FormValues) => {
        const supabase = await createClient();
        const { error } = await supabase.from('job-application').insert(formValue);
        if (error) {
            console.error(error);
            setError('root.serverError', { message: "Something went wrong at our end!" });
        }
        handleClose();
    }

    const renderStatusOption = () => {
        const options = [];
        for (let configKey of Object.keys(APPLICATION_STATUS_CONFIG)) {
            options.push(<MenuItem key={configKey} value={configKey}>
                {APPLICATION_STATUS_CONFIG[configKey].label}
            </MenuItem>)
        }
        return options;
    }

    return <Dialog
        fullWidth={true}
        maxWidth='md'
        open
        onClose={handleClose}
    >
        <DialogTitle>Track new application</DialogTitle>
        <DialogContent>
            <Box id="create-form" component={"form"} onSubmit={handleSubmit(createTracking)} sx={{ paddingTop: '1rem' }}>
                <Stack spacing={2}>
                    <Controller
                        name="company"
                        control={control}
                        rules={{
                            validate: {
                                required: (value) => {
                                    if (!value) return "Company is required!"
                                    if (value.trim().length == 0) return "Company is required!"
                                }
                            }
                        }}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                label="Company"
                                error={!!errors.company}
                                helperText={errors.company?.message}
                                fullWidth />
                        }
                    />
                    <Controller
                        name="role"
                        control={control}
                        rules={{
                            validate: {
                                required: (value) => {
                                    if (!value) return "Role is required!"
                                    if (value.trim().length == 0) return "Role is required!"
                                }
                            }
                        }}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                label="Role"
                                error={!!errors.role}
                                helperText={errors.role?.message}
                                fullWidth />
                        }
                    />
                    <Controller
                        name="status"
                        control={control}
                        rules={{
                            validate: {
                                required: (value) => {
                                    if (!value) return "Status is required!"
                                    if (value.trim().length == 0) return "Status is required!"
                                }
                            }
                        }}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                label="Status"
                                error={!!errors.status}
                                helperText={errors.status?.message}
                                select
                                fullWidth>
                                {renderStatusOption()}
                            </TextField>
                        }
                    />
                    <Controller
                        name="applied_date"
                        control={control}
                        rules={{
                            validate: {
                                required: (value) => {
                                    if (!value) return "Applied Date is required!"
                                }
                            }
                        }}
                        render={({ field }) =>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    {...field}
                                    label="Applied Date"
                                    format="yyyy-MM-dd"
                                    maxDate={new Date()}
                                    slotProps={{
                                        textField: {
                                            error: !!errors.applied_date,
                                            helperText: errors.applied_date?.message
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        }
                    />
                </Stack>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="create-form">
                Create
            </Button>
        </DialogActions>
    </Dialog>
}

export default JobApplicationFormDialog;