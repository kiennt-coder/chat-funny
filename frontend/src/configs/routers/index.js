import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import asyncComponent from "../../utils/funcAsync";
import Error from "../../pages/error";
import LoadingComponent from "../../components/LoadingComponent";
import React, { Suspense } from "react";
// import nProgress from "nprogress";

// const routes = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path="/" errorElement={<Error />}>
//             <Route
//                 path=""
//                 Component={asyncComponent(() => import("../../layouts"))}
//             >
//                 <Route
//                     path="chats"
//                     Component={asyncComponent(() =>
//                         import("../../pages/chats")
//                     )}
//                 />
//             </Route>

//             <Route
//                 path="signin"
//                 Component={asyncComponent(() => import("../../pages/login"))}
//             />

//             <Route
//                 path="signup"
//                 Component={asyncComponent(() => import("../../pages/register"))}
//             />
//         </Route>
//     )
// );

// const LayoutMain = asyncComponent(() => import("../../layouts"));
// const Chat = asyncComponent(() => import("../../pages/chats"));
// const Login = asyncComponent(() => import("../../pages/login"));
// const Register = asyncComponent(() => import("../../pages/register"));

// import LayoutMain from "../../layouts";
// import Chat from "../../pages/chats";
// import Login from "../../pages/login";
// import Register from "../../pages/register";

const LayoutMain = React.lazy(() => import("../../layouts"));
const Chat = React.lazy(() => import("../../pages/chats"));
const Login = React.lazy(() => import("../../pages/login"));
const Register = React.lazy(() => import("../../pages/register"));

const routes = () => (
    <Route path="/" errorElement={<Error />}>
        <Route
            path=""
            element={
                <Suspense fallback={<LoadingComponent />}>
                    <LayoutMain />
                </Suspense>
            }
        >
            <Route
                path="chats"
                element={
                    <Suspense fallback={<LoadingComponent />}>
                        <Chat />
                    </Suspense>
                }
            />
        </Route>

        <Route
            path="signin"
            element={
                <Suspense fallback={<LoadingComponent />}>
                    <Login />
                </Suspense>
            }
        />

        <Route
            path="signup"
            element={
                <Suspense fallback={<LoadingComponent />}>
                    <Register />
                </Suspense>
            }
        />
    </Route>
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
