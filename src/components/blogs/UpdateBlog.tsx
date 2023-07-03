import {BiBox} from "react-icons/bi";
import {Box, Button, Typography} from "@mui/material";
import {addStyles, htmlElementStyles} from "../../styles/add-blog-styles";
import {useEffect, useRef} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_BLOG, UPDATE_BLOG} from "../graphql/mutations";
import {GET_BLOG_BY_ID} from "../graphql/queries";
import {useParams} from "react-router-dom";
import toast from "react-hot-toast";

const UpdateBlog = () => {
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const contentRef = useRef<HTMLParagraphElement | null>(null);
    const id = useParams().id;
    const [updateBlog] = useMutation(UPDATE_BLOG);
    const {
        loading,
        data,
        error,
        refetch
    } = useQuery(GET_BLOG_BY_ID, {
        variables: {
            id,
        }
    });

    useEffect(() => {
        if (data && headingRef.current && contentRef.current) {
            headingRef.current.innerHTML = data.blog.title;
            contentRef.current.innerHTML = data.blog.content;
        }
    }, [id, data]);
    const handleSubmit = async () => {
        if (headingRef.current &&
            headingRef.current?.innerText.trim().length > 0 &&
            contentRef.current &&
            contentRef.current?.innerText.trim().length > 0
        ) {
            const title = headingRef.current?.innerText;
            const content = contentRef.current?.innerText;
            const user = JSON.parse(localStorage.getItem("userData") as string).id;

            console.log(title, content, user);

            try {
                const res = await updateBlog(
                    {
                        variables:
                            {
                                id,
                                title,
                                content,
                            }
                    }
                );
                toast.promise(refetch(), {
                    error: "Unexpected Error",
                    success: "Fetching Complete",
                    loading: "Hold On!",
                });
                const data = await res.data;
                console.log(data);
            } catch (e: any) {
                console.log(e.message);
            }
        }
    };
    return (
        data && (
            <Box sx={addStyles.container}>
                <Box sx={addStyles.blogHeader}>
                    <Typography>Authored by: Starscream</Typography>
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
        )
    );
}

export default UpdateBlog;