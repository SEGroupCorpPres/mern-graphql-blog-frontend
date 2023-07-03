import {Box, Button, InputLabel, TextField, Typography, useTheme, useMediaQuery} from "@mui/material";
import {authStyles} from "../../styles/auth-styles";
import {ImBlogger} from "react-icons/im";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {USER_LOGIN, USER_SIGNUP} from "../graphql/mutations";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth-slice";
import {useNavigate} from "react-router-dom";

type Inputs = {
    name: string;
    email: string;
    password: string;
};
const Auth = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: any) => state.isLoggedIn);
    console.log(isLoggedIn);
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<Inputs>();
    const dispatch = useDispatch();
    const [login] = useMutation(USER_LOGIN);
    const [signup] = useMutation(USER_SIGNUP);
    const [isSignUp, setIsSignUp] = useState(false);
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
    const onResReceived = (data: any) => {
        if (data.signup) {
            const {
                id,
                email,
                name
            } = data.signup;
            localStorage.setItem("userData", JSON.stringify({
                id,
                name,
                email
            }));
        } else {
            const {
                id,
                email,
                name
            } = data.login;
            localStorage.setItem("userData", JSON.stringify({
                id,
                name,
                email
            }));
        }
        console.log(data);
        dispatch(authActions.login());
        return navigate("/blogs");
    };
    const onSubmit = async ({
                                name,
                                email,
                                password
                            }: Inputs) => {
        if (isSignUp) {
            // sign up
            try {
                const res = await signup({
                    variables: {
                        name,
                        email,
                        password
                    }
                });
                if (res.data) {
                    onResReceived(res.data);
                }
            } catch (e: any) {
                console.log(e.message);
            }

        } else {
            //     login
            try {
                const res = await login({
                    variables: {
                        email,
                        password
                    }
                });
                if (res.data) {
                    onResReceived(res.data);
                }
            } catch (e: any) {
                console.log(e.message);
            }

        }
    };
    return (
        <Box sx={authStyles.container}>
            <Box sx={authStyles.logoTitle}><ImBlogger style={{
                borderRadius: "50%",
                padding: "10px",
                background: "#6C5252"
            }} size={"30px"}/>
                <Typography sx={authStyles.logoText}>MyBlog</Typography>
            </Box>
            <Box sx={{
                ...authStyles
                    .formContainer,
                width: isBelowMd ? "60%" : "300px"
            }}>
                <Typography sx={authStyles.logoText}>{isSignUp ? "SignUp" : "Login"}</Typography>{" "}
                {/*// @ts-ignore*/}
                <form onSubmit={handleSubmit(onSubmit)} style={authStyles.form} action="">
                    {
                        isSignUp && (
                            <>
                                <InputLabel aria-label="name"/>
                                <TextField
                                    margin="normal"
                                    InputProps={{
                                        style: {
                                            borderRadius: 20,
                                            width: "300px",
                                        }
                                    }}
                                    aria-label="name"
                                    label="Name"
                                    {
                                        ...register(
                                            "name",
                                            {required: true}
                                        )
                                    }
                                    type={"text"}/>
                            </>
                        )
                    }
                    <InputLabel aria-label="email"/>
                    <TextField
                        helperText={Boolean(errors.email) ? "Invalid email" : ""}
                        error={Boolean(errors.email)}
                        margin="normal"
                        InputProps={{
                            style: {
                                borderRadius: 20,
                                width: "300px"
                            }
                        }}
                        aria-label="email"
                        label="Email"
                        {
                            ...register(
                                "email",
                                {
                                    required: true,
                                    validate: (val: string) =>
                                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                            .test(val),
                                }
                            )
                        }
                        type={"email"}/>
                    <InputLabel aria-label="password"/>
                    <TextField
                        helperText={Boolean(errors.password) ? "Length should be greater than 5" : ""}
                        error={Boolean(errors.password)}
                        margin="normal"
                        InputProps={{
                            style: {
                                borderRadius: 20,
                                width: "300px"
                            }
                        }}
                        aria-label="password"
                        label="Password"
                        {
                            ...register(
                                "password",
                                {
                                    required: true,
                                    minLength: 6
                                }
                            )
                        }
                        type={"password"}/>
                    <Button type={"submit"} variant={"outlined"} sx={authStyles.submitBtn}>{isSignUp ? "SignUp" : "Login"}</Button>
                    {/*// @ts-ignore*/}
                    <Button onClick={() => setIsSignUp((prev) => !prev)} variant={"outlined"} sx={{
                        ...authStyles
                            .submitBtn, ...authStyles.switchBtn
                    }}>Switch to {isSignUp ? "Login" : "SignUp"}</Button>
                </form>
            </Box>
        </Box>
    );
};

export default Auth;
