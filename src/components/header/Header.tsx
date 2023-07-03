import {AppBar, Box, Tab, Tabs, Toolbar, Button, Typography, IconButton, useMediaQuery, useTheme} from "@mui/material";
import {ImBlogger} from "react-icons/im";
import {BiLogInCircle} from "react-icons/bi";
import {headerStyles} from "../../styles/header-styles";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import UserMenu from "./user/UserMenu";
import DrawerComponent from "./DrawerComponent";

const Header = () => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: any) => state.isLoggedIn);
    const [value, setValue] = useState(0);
    const handleAddBlog = () => {
        if (isLoggedIn) {
            navigate("/add");
        } else {
            navigate("/auth");
        }
    }

    return (
        <AppBar sx={headerStyles.appBar}>
            <Toolbar>
                <ImBlogger style={{
                    borderRadius: "50%",
                    padding: "10px",
                    background: "#6C5252"
                }} size={"30px"}/>
                {
                    isBelowMd
                        ? (<DrawerComponent isLoggedIn={isLoggedIn}/>)
                        : (
                            <>
                                <Typography
                                    ml={1.3}
                                    fontWeight={"500"}
                                    fontSize={{
                                        lg: 18,
                                        md: 17,
                                        sm: 13,
                                        xs: 11
                                    }}
                                    fontFamily={"Work Sans"}
                                    sx={{textShadow: "4px 1px 20px #D5D5D5"}}
                                >
                                    MyBlog
                                </Typography>
                                <Box onClick={handleAddBlog} sx={headerStyles.addLink}>
                                    <Typography fontSize={20} fontFamily={"Work Sans"}>Post New Blog</Typography>
                                    <IconButton color={"inherit"}><ImBlogger/></IconButton>
                                </Box>
                                <Box sx={headerStyles.tabContainer}>
                                    <Tabs
                                        textColor="inherit"
                                        indicatorColor="primary"
                                        TabIndicatorProps={{style: {background: "white"}}}
                                        value={value}
                                        onChange={(e, val) => setValue(val)}>
                                        {/*@ts-ignore*/}
                                        <Tab LinkComponent={Link} to="/" disableRipple label="Home"/>
                                        {/*@ts-ignore*/}
                                        <Tab LinkComponent={Link} to="/blogs" disableRipple label="Blogs"/>
                                    </Tabs>
                                    {
                                        isLoggedIn ?
                                            (<UserMenu/>)
                                            : (
                                                <Link to="/auth">
                                                    <Button endIcon={<BiLogInCircle/>} sx={headerStyles.authBtn}>Auth</Button>
                                                </Link>
                                            )
                                    }
                                </Box>
                            </>
                        )
                }
            </Toolbar>
        </AppBar>
    );
};
export default Header;