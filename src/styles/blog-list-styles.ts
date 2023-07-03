import {Styles} from "./homepage-styles";

const colors = [
    "#FF9800",
    "#FF5722",
    "#607D8B",
    "#4CAF50",
    "#8BC34A",
    "#40C4FF",
    "#0277BD",
    "#4DB6AC",
    "#009688",
    "#448AFF",
    "#42A5F5",
    "#7E57C2",
    "#D32F2F",
    "#AB47BC",
]

export function randomBgColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

export const blogStyles: Styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        gap: 10,
        flexWrap: "wrap",
        m: 2
    },
    card: {
        width: "500px",
        display: "flex",
        flexDirection: "column",
        height: "60vh",
        transition: "transform 1s",
        ":hover": {
            transform: "scale(1.03)",
            boxShadow: "10px 10px 20px #CCC",
        }
    },
    cardHeader: {
        fontFamily: "Work Sans",
        fontSize: "72px",
        height: "auto",
        minHeight: "40px",
        padding: 1,
        mb: 2,
        ":hover": {
            cursor: "pointer",
        }
    },
    dateContainer: {
        display: "flex",
        alignItems: "center",
        gap: 2,
    },
    cardContent: {
        width: "100%",
        height: "75%",
        fontSize: "20px",
        fontWeight: 500,
    },
    title: {
        fontWeight: "600",
        ml: 1,
        color: "white",
        textTransform: "uppercase",
        fontFamily: "Work Sans",
        fontSize: {lg: 32, md: 28, sm: 22, xs: 18},
        textShadow: "2px 7px 20px #000",
        ":hover": {
            textDecoration: "underline",
            textUnderlineOffset: "5px",
        },
    },
    contentText: {
        padding: 2,
        fontSize: "20px",
        fontWeight: "500",
    },
    author: {
        display: "flex",
        alignItems: "center",
        gap: 1,
        fontWeight: "bold",
        fontFamily: "Work Sans",
        padding: 2,
        color: "white",
    }
}