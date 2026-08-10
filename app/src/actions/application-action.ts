'use server'
import { cookies } from "next/headers";
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { format, isFuture, startOfDay } from "date-fns";
import { APPLICATION_STATUS, INITIAL_APPLICATION_STATUS_CONFIG } from "../constants/application-status";
import type { JobApplicationFormValue } from '../types/job-application';
import * as z from 'zod'

const MAX_TEXT_LENGTH = 200;

// Only the statuses the create form offers are accepted on creation.
const ALLOWED_STATUSES = Object.keys(INITIAL_APPLICATION_STATUS_CONFIG) as [
    APPLICATION_STATUS,
    ...APPLICATION_STATUS[],
];

const CreateTrackingSchema = z
    .object({
        company: z.string().trim().min(1, 'Company is required!').max(MAX_TEXT_LENGTH, 'Company is too long.'),
        role: z.string().trim().min(1, 'Role is required!').max(MAX_TEXT_LENGTH, 'Role is too long.'),
        status: z.enum(ALLOWED_STATUSES, { error: 'Status is required!' }),
        applied_date: z.coerce.date({ error: 'Applied Date is invalid!' }).nullable().default(null),
    })
    .refine(({ status, applied_date }) => status === APPLICATION_STATUS.SAVED || applied_date !== null, {
        path: ['applied_date'],
        error: 'Applied Date is required!',
    })
    // Checked per request, not once at module load.
    .refine(({ applied_date }) => applied_date === null || !isFuture(startOfDay(applied_date)), {
        path: ['applied_date'],
        error: 'Applied Date cannot be in the future.',
    })
    .transform(({ company, role, status, applied_date }) => ({
        company,
        role,
        status,
        // A `date` column stores a calendar day, so format in local time. Sending the
        // raw Date would serialize to UTC and shift to the previous day for UTC+ offsets.
        applied_date:
            status === APPLICATION_STATUS.SAVED || applied_date === null
                ? null
                : format(applied_date, 'yyyy-MM-dd'),
    }));

export const createTracking = async (formValue: JobApplicationFormValue) => {
    // A Server Action is a public POST endpoint: the client-side form validation
    // can be bypassed entirely, so treat this payload as untrusted.
    const parsed = CreateTrackingSchema.safeParse(formValue);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Invalid input' };
    }

    const cookieStore = await cookies()
    const supabase = createClient(cookieStore);

    const { error } = await supabase.from('job-application').insert(parsed.data);
    if (error) {
        // Keep Postgres details server-side; return something safe to render.
        console.error('[createTracking] insert failed:', error);
        return { error: 'Something went wrong!' }
    }

    revalidatePath('/');
    return { success: true }
}
