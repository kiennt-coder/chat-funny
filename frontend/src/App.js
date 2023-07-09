import { RouterProvider } from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent";
import routes from "./configs/routers";
import setting from "./configs/setting";
import { socket } from "./services/socket";
import "./App.css";
import { useEffect } from "react";

function App() {
    document.title = setting.APP_NAME;

    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <RouterProvider
            router={routes}
            fallbackElement={<LoadingComponent />}
        />
    );
}

export default App;
