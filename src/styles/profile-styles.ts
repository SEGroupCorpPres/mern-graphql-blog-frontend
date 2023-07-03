import {Styles} from "./homepage-styles";
import blogs from "../components/blogs/Blogs";

export const profileStyles: Styles = {
    container: {
        display: "flex",
        flex: 1,
    },
    blogsContainer: {
        display: "flex",
        flex: 0.7,
        flexDirection: "column",
        padding: 1,
        border: "1px solid #404040",
    },
    cardsContainer: {
        display: "flex",
        gap: 5,
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 4,
    },
    text: {
        fontFamily: "Work Sans",
        textAlign: "center",
    },
    profileContainer: {
        display: "flex",
        flex: 0.3,
    },
    userContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        margin: "auto",
        position: "fixed",
        top: "10",
        bottom: "10",
        left: "20",
        right: "20",
        gap: 5,
        padding: 4,
    },
    avtar: {
        width: "100px",
        height: "100px",
        bgcolor: "#404040",
    }
}