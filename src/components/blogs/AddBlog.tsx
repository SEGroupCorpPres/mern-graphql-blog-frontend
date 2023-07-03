import {BiBox} from "react-icons/bi";
import {Box, Button, Typography} from "@mui/material";
import {addStyles, htmlElementStyles} from "../../styles/add-blog-styles";
import {useRef} from "react";
import {useMutation} from "@apollo/client";
import {ADD_BLOG} from "../graphql/mutations";

const AddBlog = () => {
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const contentRef = useRef<HTMLParagraphElement | null>(null);
            const user = JSON.parse(localStorage.getItem("userData") as string);

    const [addBlog] = useMutation(ADD_BLOG);
    const handleSubmit = async () => {
        if (headingRef.current &&
            headingRef.current?.innerText.trim().length > 0 &&
            contentRef.current &&
            contentRef.current?.innerText.trim().length > 0
        ) {
            const title = headingRef.current?.innerText;
            const content = contentRef.current?.innerText;
            const date = new Date();
            console.log(title, content, date, user);
            try {
                const res = await addBlog(
                    {
                        variables:
                            {
                                title,
                                content,
                                date,
                                id: user.id,
                            }
                    }
                );
                const data = await res.data;
                console.log(data);
            } catch (e: any) {
                console.log(e.message);
            }
        }
    };
    return (
        <Box sx={addStyles.container}>
            <Box sx={addStyles.blogHeader}>
                <Typography>Authored by: {user.name}</Typography>
                <Button onClick={handleSubmit} color={"success"} variant={"contained"}>Publish</Button>
            </Box>
            <form action="">
                <Box sx={addStyles.formContainer}>
                    <h2
                        ref={headingRef}
                        style={htmlElementStyles.h2}
                        placeholder={"Title..."}
                        contentEditable={true}
                        suppressContentEditableWarning={true}>
                        Title
                    </h2>
                    <p
                        ref={contentRef}
                        style={htmlElementStyles.p}
                        contentEditable={true}
                        suppressContentEditableWarning={true}>
                        Content
                    </p>
                </Box>
            </form>
        </Box>
    );
}

export default AddBlog;