import { APPLICATION_STATUS } from "../constants/application-status";

export type JobApplication = {
    id: number,
    company: string;
    role: string;
    status: APPLICATION_STATUS;
    applied_date: Date;
}