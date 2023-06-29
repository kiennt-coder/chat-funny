import { createBrowserRouter } from "react-router-dom";
import Error from "../../pages/error";
import LayoutMain from "../../layouts";
import Chat from "../../pages/chats";
import Login from "../../pages/login";
import Register from "../../pages/register";

const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <LayoutMain />,
                children: [
                    {
                        path: "chats",
                        element: <Chat />,
                        children: [
                            {
                                path: ":id",
                                element: <></>,
                            },
                        ],
                    },
                ],
            },
            {
                path: "/signin",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Register />,
            },
        ],
    },
]);

export default routes;
