import {Avatar, Box, Dialog, DialogContent, IconButton, LinearProgress, TextField, Typography} from "@mui/material";
import {blogPageStyles} from "../../styles/view-blog-styles";
import {FaComments} from "react-icons/fa6";
import {BiSend} from "react-icons/bi";
import {HiMail} from "react-icons/hi";
import {AiOutlineDelete} from "react-icons/ai";
import {useMutation, useQuery} from "@apollo/client";
import {GET_BLOG_BY_ID} from "../graphql/queries";
import {useParams} from "react-router-dom";
import {CommentType} from "../../types/Types";
import {BsCalendarDate} from "react-icons/bs";
import {useForm} from "react-hook-form";
import {ADD_COMMENT, DELETE_COMMENT} from "../graphql/mutations";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";

function getInitials(name: String) {
    const nameArr = name.split(" ");
    if (nameArr.length > 0) {
        return `${nameArr[0][0]}${nameArr[1][0]}`;
    }
    return `${nameArr[0]}`;
}

const ViewBlog = () => {
    const user: string = JSON.parse(localStorage.getItem("userData") as string)?.id;
    const isLoggedIn = useSelector((state: any) => state.isLoggedIn);
    const {
        register,
        handleSubmit
    } = useForm();
    const id = useParams().id;
    const [addCommentToBlog, addCommentResponse] = useMutation(ADD_COMMENT);
    const [deleteComment] = useMutation(DELETE_COMMENT);
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
    // console.log(data.blog.user.id);
    const commentHandler = async (data: any) => {
        if (isLoggedIn) {

            const text = data.comment;
            const date = new Date();
            try {
                await addCommentToBlog({
                    variables: {
                        text,
                        date,
                        blog: id,
                        user,
                    }
                });
                toast.promise(refetch(), {
                    error: "Unexpected Error",
                    success: "Fetching Complete",
                    loading: "Hold On!",
                });
            } catch (e: any) {
                console.log(e.message);
            }
        } else {
            toast.error("You need to login first!");
        }
    }

    if (loading) {
        return <LinearProgress/>
    }
    if (error) {
        return (
            <Dialog open={true}>
                <DialogContent>
                    Error Fetching blog
                </DialogContent>
            </Dialog>
        );
    }
    const handleCommentDelete = async (id: string) => {
        try {
            await deleteComment({
                variables: {
                    id
                }
            });
            toast.promise(refetch(), {
                error: "UnExpected Error",
                success: "Fetching Complete",
                loading: "Hold On!",
            });
        } catch (e: any) {
            console.log(e.message);
        }
    }
    return (
        data && (<Box sx={blogPageStyles.container}>
            <Box sx={blogPageStyles.profileHeader}>
                <Typography sx={blogPageStyles.headerText}>{data.blog.user.name}</Typography>
                <Box sx={blogPageStyles.profileHeaderItems}>
                    <HiMail size={20}/>
                    <Typography sx={blogPageStyles.headerText}>{data.blog.user.email}</Typography>
                    <Box sx={{
                        ml: "auto",
                        display: "flex",
                        gap: 3,
                        alignItems: "center"
                    }}>
                        <BsCalendarDate/>
                        <Typography
                            fontFamily={"Work Sans"}
                            fontWeight={"500"}>
                            {new Date(Number(data.blog.date)).toDateString()}
                        </Typography>
                    </Box>
                </Box>
                <Typography sx={blogPageStyles.blogTitle}>{data.blog.title}</Typography>
                <Typography sx={blogPageStyles.blogContent}>{data.blog.content}</Typography>
                <Box sx={blogPageStyles.commentBox}>Comments: {"    "}
                    <IconButton>
                        <FaComments size={"30"}/>
                    </IconButton>
                </Box>
                {
                    isLoggedIn
                    && (
                        <Box sx={blogPageStyles.commentInputContainer}>
                            <Typography margin={2} fontFamily={"Arvo"}>Add your comment</Typography>
                            <Box sx={blogPageStyles.inputLayout}>
                                <TextField
                                    {...register("comment")}
                                    type={"textarea"}
                                    sx={blogPageStyles.textField}
                                    InputProps={{
                                        style: {
                                            width: "60vw",
                                            borderRadius: "20px",
                                            fontFamily: "Work Sans",
                                        },
                                        endAdornment: (
                                            <IconButton onClick={handleSubmit(commentHandler)}>
                                                <BiSend size={"25"}/>
                                            </IconButton>
                                        )
                                    }}
                                />
                            </Box>
                        </Box>
                    )
                }
                {
                    data.blog.comments.length > 0
                    && (
                        <Box sx={blogPageStyles.comments}>
                            {
                                data.blog.comments.map((comment: any) => (<Box key={comment.id} sx={blogPageStyles.commentsItem}>
                                    <Avatar
                                        sx={{
                                            padding: 1,
                                            color: "red",
                                            bgcolor: "transparent"
                                        }}>
                                        {getInitials(comment.user.name)}
                                    </Avatar>
                                    <Typography sx={blogPageStyles.commentText}>{comment.text}</Typography>
                                    {user === comment.user.id && <IconButton onClick={async () => await handleCommentDelete(comment.id)} sx={{ml: "auto"}} color="error"><AiOutlineDelete/></IconButton>}
                                </Box>))
                            }{" "}
                        </Box>
                    )
                }
            </Box>
        </Box>)
    );
}

export default ViewBlog;