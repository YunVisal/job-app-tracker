'use client'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FC } from "react";
import { useForm, Controller } from 'react-hook-form'
import { INITIAL_APPLICATION_STATUS_CONFIG } from "../constants/application-status";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { JobApplicationFormValue } from '../types/job-application';
import { createTracking } from "../actions/application-action";
import { useSnackbar } from "../hooks/use-snackbar";

interface JobApplicationFormDialog {
    handleClose: () => void;
}

const JobApplicationFormDialog: FC<JobApplicationFormDialog> = ({ handleClose }) => {
    const { control, watch, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<JobApplicationFormValue>({
        defaultValues: {
            company: '',
            role: '',
            status: '',
            applied_date: null
        }
    });

    const watchStatus = watch('status');

    const { notify } = useSnackbar();

    const submitForm = async (formValue: JobApplicationFormValue) => {
        const { error } = await createTracking(formValue);
        if (error) {
            setError('root.serverError', { message: error })
            notify(error, "error")
            return;
        }

        notify("Success!", "success")
        handleClose();
    }

    const renderStatusOption = () =>
        Object.entries(INITIAL_APPLICATION_STATUS_CONFIG).map(([configKey, { label }]) => (
            <MenuItem key={configKey} value={configKey}>{label}</MenuItem>
        ));

    return <Dialog
        fullWidth={true}
        maxWidth='md'
        open
        onClose={handleClose}
    >
        <DialogTitle>Track new application</DialogTitle>
        <DialogContent>
            <Box id="create-form" component={"form"} onSubmit={handleSubmit(submitForm)} sx={{ paddingTop: '1rem' }}>
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
                    {watchStatus && watchStatus != 'SAVED' && <Controller
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
                    />}
                    {errors.root?.serverError && <Typography variant="caption" color="error">{errors.root.serverError.message}</Typography>}
                </Stack>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button disabled={isSubmitting} onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="create-form" disabled={isSubmitting}>
                Create
            </Button>
        </DialogActions>
    </Dialog>
}

export default JobApplicationFormDialog;