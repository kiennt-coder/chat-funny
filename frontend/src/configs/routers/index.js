import { createBrowserRouter } from "react-router-dom";
import asyncComponent from "../../utils/funcAsync";
import Error from "../../pages/error";

const routes = createBrowserRouter([
    {
        path: "/",
        Component: asyncComponent(() => import("../../layouts")),
        errorElement: <Error />,
        children: [
            {
                path: "chats",
                Component: asyncComponent(() => import("../../pages/chats")),
                children: [
                    {
                        path: ":id",
                        Component: asyncComponent(() => <></>),
                    },
                ],
            },
        ],
    },
    {
        path: "/signin",
        Component: asyncComponent(() => import("../../pages/login")),
    },
    {
        path: "/signup",
        Component: asyncComponent(() => import("../../pages/register")),
    },
]);

export default routes;
