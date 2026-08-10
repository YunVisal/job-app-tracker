'use client'
import { createContext } from "react";

type SnackbarContextState = {
    notify: (message: string, severity: "success" | "error" | undefined) => void
}

export const SnackbarContext = createContext<SnackbarContextState>({
    notify(message, severity) {

    },
});