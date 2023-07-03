import {Box, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {FaUserCircle} from "react-icons/fa";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {authActions} from "../../../store/auth-slice";
import {Link, useNavigate} from "react-router-dom";

const UserMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate("/auth");
    };
    const onProfileClicked = () => {
        navigate("/profile");
    }
    return <Box>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color={"inherit"}>
            <FaUserCircle/>
        </IconButton>
        <Menu onClose={() => setAnchorEl(null)} anchorEl={anchorEl} open={Boolean(anchorEl)}>
            <MenuItem onClick={onProfileClicked}>
                <Typography>Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <Typography>Logout</Typography>
            </MenuItem>
        </Menu>
    </Box>
}
export default UserMenu;