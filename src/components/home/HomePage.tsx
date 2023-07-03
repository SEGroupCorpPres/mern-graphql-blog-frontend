import {Box, Typography} from "@mui/material";
import {homePageStyles} from "../../styles/homepage-styles";

const HomePage = () => {
    return <Box sx={homePageStyles.container}>
        <Box sx={homePageStyles.wrapper}>
            <Typography sx={homePageStyles.text}> Write and Share Your blog with millions of People </Typography>
            <img
                width="50%"
                height="50%"
                // @ts-ignore
                style={homePageStyles.image}
                src="/blog.png" alt="Blog"/>
        </Box>
        <Box sx={homePageStyles.wrapper}>

            <img
                width="50%"
                height="50%"
                // @ts-ignore
                style={homePageStyles.image} src="/publish.png" alt="Publish"/>
            <Typography sx={homePageStyles.text}> Write and Share Your blog with millions of People </Typography>

        </Box>
        <Box sx={homePageStyles.wrapper}>
            <Typography sx={homePageStyles.text}> Write and Share Your blog with millions of People </Typography>
            <img
                width="50%"
                height="50%"
                // @ts-ignore
                style={homePageStyles.image} src="/article.png" alt="Article"/>

        </Box>

    </Box>;
}

export default HomePage;