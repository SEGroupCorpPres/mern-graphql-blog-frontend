import {BlogType} from "../../types/Types";
import {Box, Card, CardActions, IconButton, Typography} from "@mui/material";
import {blogStyles, randomBgColor} from "../../styles/blog-list-styles";
import {FcCalendar} from "react-icons/fc";
import {useNavigate} from "react-router-dom";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_BLOG} from "../graphql/mutations";
import toast from "react-hot-toast";
import {FaUser} from "react-icons/fa6";

type Props = {
    blog: BlogType;
    showActions?: Boolean;
};

const BlogItem = (props: Props) => {
    const navigate = useNavigate();
    const [deleteBlog] = useMutation(DELETE_BLOG);
    const handleClick = () => {
        return navigate(`/blog/view/${props.blog.id}`);
    };
    const editHandler = () => {
        return navigate(`/blog/update/${props.blog.id}`);
    };
    const deleteHandler = async () => {
        try {
            await deleteBlog({
                variables: {
                    id: props.blog.id,
                }
            });
            navigate("/profile");
        } catch (e: any) {
            return console.log(e.message);
        }
    };
    return (
        <Card sx={blogStyles.card}>
            {
                props.showActions && (<CardActions>
                        <IconButton onClick={editHandler}><AiOutlineEdit/></IconButton>
                        <IconButton onClick={deleteHandler}><AiOutlineDelete/></IconButton>
                    </CardActions>
                )
            }
            <Box onClick={handleClick} sx={{
                ...blogStyles
                    .cardHeader,
                bgcolor: randomBgColor()
            }}>
                <Box sx={blogStyles.dateContainer}>
                    <FcCalendar size="30px"/>
                    <Typography fontSize={"20px"} variant={"caption"} color={"white"}>{new Date(Number(props.blog.date)).toDateString()}</Typography>
                </Box>
                <Typography variant="h4" sx={blogStyles.title}>{props.blog.title}</Typography>
                <Typography sx={blogStyles.author}>{" "}<FaUser/>{props.blog.user.name}</Typography>
            </Box>
            <Box sx={blogStyles.cardContent}>
                <Typography sx={blogStyles.contentText}>{props.blog.content}</Typography>
            </Box>
        </Card>
    );
};
export default BlogItem;