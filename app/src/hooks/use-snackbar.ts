import { useContext } from "react"
import { SnackbarContext } from "../contexts/snackbar-context"

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    return context;
}