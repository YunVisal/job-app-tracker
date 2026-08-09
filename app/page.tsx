import { Box } from "@mui/material";
import CustomAppBar from "./src/components/app-bar";
import JobApplicationContainer from "./src/components/job-application-container";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar />
      <JobApplicationContainer />
    </Box>
  );
}
