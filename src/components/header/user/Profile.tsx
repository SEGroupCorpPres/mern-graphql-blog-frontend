import {Avatar, Box, LinearProgress, Typography} from "@mui/material";
import {profileStyles} from "../../../styles/profile-styles";
import BlogItem from "../../blogs/BlogItem";
import {useQuery} from "@apollo/client";
import {GET_USER_BLOGS} from "../../graphql/queries";
import {BlogType} from "../../../types/Types";

const Profile = () => {
    const {
        loading,
        data,
        error
    } = useQuery(GET_USER_BLOGS, {
        variables: {
            id: JSON.parse(localStorage.getItem("userData") as string).id,
        }
    });
    // const {loading, data, error} = useQuery(GET_USER)
    console.log(data);

    if (error) {
        return <p>ERROR</p>
    }

    return loading ? (<LinearProgress/>) : data && (
        <Box sx={profileStyles.container}>
            <Box sx={profileStyles.blogsContainer}>
                <Typography variant={"h3"} sx={profileStyles.text}>
                    My Posts
                </Typography>
                <Box sx={profileStyles.cardsContainer}>
                    {data.user.blogs.map((item: BlogType) => (
                        <BlogItem
                            // @ts-ignore
                            blog={{
                                title: item.title,
                                content: item.content,
                                date: item.date,
                                id: item.id

                            }}
                            showActions={true}
                        />
                    ))}
                </Box>
            </Box>
            <Box sx={profileStyles.profileContainer}>
                <Box sx={profileStyles.userContainer}>
                    <Avatar sx={profileStyles.avatar}></Avatar>
                    <Typography variant={"h3"} fontFamily={"Work Sans"}>Name: Sulaymon O'rinov</Typography>
                    <Typography variant={"h4"} fontFamily={"Work Sans"}>Email: artessdu@gmail.com</Typography>
                    <Typography variant={"h4"} fontFamily={"monospace"}>You wrote {data.user.blogs.length} Blogs 🏆</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Profile;