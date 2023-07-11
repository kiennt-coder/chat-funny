import { Navigate, createBrowserRouter } from "react-router-dom";
import Error from "../../pages/error";
import LayoutMain from "../../layouts";
import Chat from "../../pages/chats";
import Login from "../../pages/login";
import Register from "../../pages/register";
import Home from "../../pages/home";
import setting from "../setting";

const { LOCAL_STORAGE } = setting;

const PrivateRouter = ({ children }) => {
    const accessToken = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
    );

    return accessToken?.token ? <>{children}</> : <Navigate to="/signin" />;
};

const PublicRouter = ({ children }) => {
    const accessToken = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
    );
    const remember = localStorage.getItem(LOCAL_STORAGE.REMEMBER);

    return accessToken?.token && remember?.match("true") ? (
        <Navigate to="/chats" />
    ) : (
        <>{children}</>
    );
};

const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error />,
        children: [
            {
                path: "",
                element: (
                    <PrivateRouter>
                        <LayoutMain />
                    </PrivateRouter>
                ),
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: "chats/*",
                        element: <Chat />,
                        children: [
                            {
                                path: ":id",
                                element: <div></div>,
                            },
                        ],
                    },
                ],
            },
            {
                path: "signin",
                element: (
                    <PublicRouter>
                        <Login />
                    </PublicRouter>
                ),
            },
            {
                path: "signup",
                element: (
                    <PublicRouter>
                        <Register />
                    </PublicRouter>
                ),
            },
        ],
    },
]);

export default routes;
