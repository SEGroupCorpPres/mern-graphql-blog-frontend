import {Box, Button, Typography} from "@mui/material";
import {homePageStyles} from "../../styles/homepage-styles";

const Footer = () => {
    return <Box sx={homePageStyles.footerContainer}>
        <Button variant="contained" sx={homePageStyles.footerBtn}>Vier Articles</Button>
        <Typography sx={homePageStyles.footerText}>Made With 👨🏽‍💻 By Future Technologies Inc 🏢. PresidentFTInc</Typography>
        <Button variant="contained" sx={homePageStyles.footerBtn}>Publish One</Button>
    </Box>
}

export default Footer;