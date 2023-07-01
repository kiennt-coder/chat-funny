import { RouterProvider } from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent";
import routes from "./configs/routers";
import setting from "./configs/setting";
import "./App.css";

function App() {
    document.title = setting.APP_NAME;

    return (
        <RouterProvider
            router={routes}
            fallbackElement={<LoadingComponent />}
        />
    );
}

export default App;
