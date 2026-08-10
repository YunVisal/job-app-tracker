import { APPLICATION_STATUS } from "../constants/application-status";

export type JobApplication = {
    id: number,
    company: string;
    role: string;
    status: APPLICATION_STATUS;
    // A `date` column comes back as a calendar-day string ('yyyy-MM-dd'), not a Date.
    // Null for statuses that predate applying (e.g. SAVED).
    applied_date: string | null;
}

export type JobApplicationFormValue = {
    company: string,
    role: string,
    status: string,
    applied_date: Date | null
}
