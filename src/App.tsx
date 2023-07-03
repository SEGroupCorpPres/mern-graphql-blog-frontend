import './App.css';
import HomePage from "./components/home/HomePage";
import Header from "./components/header/Header";
import Footer from "./components/home/Footer";
import {Route, Routes} from "react-router-dom";
import Blogs from "./components/blogs/Blogs";
import Auth from "./components/auth/Auth";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {authActions} from "./store/auth-slice";
import Profile from "./components/header/user/Profile";
import AddBlog from "./components/blogs/AddBlog";
import ViewBlog from "./components/blogs/ViewBlog";
import {Toaster} from "react-hot-toast";
import UpdateBlog from "./components/blogs/UpdateBlog";
import NotFound from "./components/not-found/NotFound";

function App() {
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector((state: any) => state.isLoggedIn);
    console.log(isLoggedIn);
    useEffect(() => {
        const data: string = localStorage.getItem("userData") as string;
        console.log(data);
        if (JSON.parse(data) !== null) {
            dispatch(authActions.login());
        }
    }, []);
    return (
        <div className={"wrapper"}>
            <Toaster/>
            <header><Header/></header>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/blogs" element={<Blogs/>}/>
                    <Route path="/auth" element={isLoggedIn ? <Profile/> : <Auth/>}/>
                    <Route path="/add" element={isLoggedIn ? <AddBlog/> : <Auth/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/blog/view/:id" element={<ViewBlog/>}/>
                    <Route path="/blog/update/:id" element={isLoggedIn ? <UpdateBlog/> : <Auth/>}/>
                    <Route path="/*" element={<NotFound/>}/>

                </Routes>
            </main>
            <footer><Footer/></footer>
        </div>
    );
}

export default App;
