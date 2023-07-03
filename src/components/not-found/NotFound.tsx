import {Box, Typography} from "@mui/material";
import {MdSearchOff} from "react-icons/md";

const NotFound = () => {
    return (
        <Box
            width={"100vw"}
            height={"70vh"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            margin={"auto"}
        >
            <MdSearchOff size={"150px"} color="red"/>
            <Typography variant={"h4"} fontFamily={"Arvo"} padding={3}>Oops Request Page not found</Typography>
        </Box>
    );
}

export default NotFound;