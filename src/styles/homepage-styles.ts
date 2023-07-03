import {SxProps} from "@mui/material";

export type Styles = {
    [key: string]: SxProps;
};

export const homePageStyles: Styles ={
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
        alignItems: 'center',
        padding: 6,
    },
    text: {
        fontFamily: 'Work Sans',
        fontWeight: "500",
        textShadow: "12px 10px 10px #ccc",
        fontSize: {lg: 50, md: 40, sm: 35, xs: 20},
    },
    image: {
        boxShadow: "10px 10px 25px #000",
        borderRadius: 20,
    },
    footerContainer: {
        display: 'flex',
        background: "#404040",
        alignItems: 'center',
        height: "20vh",
        justifyContent: 'center',
        width: "100%",
        gap: "30px",
    },
    footerBtn: {
        borderRadius: 10,
        background: "blueviolet",
        width: "25%",
        maxWidth: "200px",
        ":hover": {
            background: "#BD63FA",
        },
        fontSize: {lg: 16, md: 16, sm: 8, xs: 8}
    },
    footerText: {
        fontFamily: "Work Sans",
        fontWeight: "500",
        fontSize: {lg: 20, md: 18, sm: 8, xs: 8},
        color: "white",
    },
}