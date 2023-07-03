import {Styles} from "./homepage-styles";

export const authStyles: Styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
    },
    logoTitle: {
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
        mt: 1,
        mb: 1,
    },
    logoText: {
        fontFamily: "Work Sans",
        fontSize: "30px",
        textAlign: "center",
    },
    formContainer: {
        width: "300px",
        border: "1px solid #CCC",
        borderRadius: 5,
        padding: 5,
        boxShadow: "5px 5px 10px #000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
        m: 5
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    submitBtn: {
        fontFamily: "Work Sans",
        mt: 1,
        mb: 1,
        width: "200px",
        borderRadius: 10,
        bgcolor: "#273238",
        ":hover": {
            color: "white",
            bgcolor: "orangered",
            boxShadow: "10px 10px 20px #CCC",
        },
    },
    switchBtn: {
        background: "transparent",
        color: "#273238",
        ":hover": {
            textDecoration: "underline",
            textUnderlineOffset: "5px",
        },
    },
}