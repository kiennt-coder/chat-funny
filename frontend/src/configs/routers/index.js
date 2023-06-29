import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import asyncComponent from "../../utils/funcAsync";
import Error from "../../pages/error";
// import nProgress from "nprogress";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<Error />}>
            <Route
                path=""
                Component={asyncComponent(() => import("../../layouts"))}
            >
                <Route
                    path="chats"
                    Component={asyncComponent(() =>
                        import("../../pages/chats")
                    )}
                />
            </Route>

            <Route
                path="signin"
                Component={asyncComponent(() => import("../../pages/login"))}
            />

            <Route
                path="signup"
                Component={asyncComponent(() => import("../../pages/register"))}
            />
        </Route>
    )
);

// const routes = createBrowserRouter(
//     [
//         // {
//         //     path: "/",
//         //     errorElement: <Error />,
//         //     children: [
//         //         {
//         //             path: "/",
//         //             Component: asyncComponent(() => import("../../layouts")),
//         //             exact: true,
//         //             children: [
//         //                 {
//         //                     path: "/chats",
//         //                     Component: asyncComponent(() =>
//         //                         import("../../pages/chats")
//         //                     ),
//         //                     children: [
//         //                         {
//         //                             path: ":id",
//         //                             Component: asyncComponent(() => <></>),
//         //                         },
//         //                     ],
//         //                 },
//         //             ],
//         //         },
//         //         {
//         //             path: "/signin",
//         //             Component: asyncComponent(() =>
//         //                 import("../../pages/login")
//         //             ),
//         //         },
//         //         {
//         //             path: "/signup",
//         //             Component: asyncComponent(() =>
//         //                 import("../../pages/register")
//         //             ),
//         //         },
//         //     ],
//         // },
//         {
//             path: "/",
//             index: true,
//             errorElement: <Error />,
//             element: (
//                 <div>{asyncComponent(() => import("../../layouts"))}</div>
//             ),
//             children: [
//                 {
//                     path: "chats",
//                     element: (
//                         <div>
//                             {asyncComponent(() =>
//                                 import("../../pages/chats")
//                             )}
//                         </div>
//                     ),
//                 },
//             ],
//         },
//     ],
//     { basename: "/" }
// );

export default routes;
