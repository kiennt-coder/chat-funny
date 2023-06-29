import { createBrowserRouter } from "react-router-dom";
// import asyncComponent from "../../utils/funcAsync";
import Error from "../../pages/error";
import nProgress from "nprogress";

const routes = createBrowserRouter(
    [
        // {
        //     path: "/",
        //     errorElement: <Error />,
        //     children: [
        //         {
        //             path: "/",
        //             Component: asyncComponent(() => import("../../layouts")),
        //             exact: true,
        //             children: [
        //                 {
        //                     path: "/chats",
        //                     Component: asyncComponent(() =>
        //                         import("../../pages/chats")
        //                     ),
        //                     children: [
        //                         {
        //                             path: ":id",
        //                             Component: asyncComponent(() => <></>),
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //         {
        //             path: "/signin",
        //             Component: asyncComponent(() =>
        //                 import("../../pages/login")
        //             ),
        //         },
        //         {
        //             path: "/signup",
        //             Component: asyncComponent(() =>
        //                 import("../../pages/register")
        //             ),
        //         },
        //     ],
        // },
        {
            path: "/",
            errorElement: <Error />,
            async lazy() {
                nProgress.start();
                let { default: Layout } = await import("../../layouts");
                nProgress.done();
                return { Component: Layout };
            },
            children: [
                {
                    path: "chats",
                    async lazy() {
                        nProgress.start();
                        let { default: Chat } = await import(
                            "../../pages/chats"
                        );
                        nProgress.done();
                        return { Component: Chat };
                    },
                },
            ],
        },
    ],
    { basename: "/" }
);

export default routes;
