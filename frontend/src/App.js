import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ConfigProvider } from "antd";
import mainTheme from "./configs/themes";
import { RouterProvider } from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent";
import routes from "./configs/routers";
import setting from "./configs/setting";
import "antd/dist/reset.css";
import "./App.css";
import store from "./services/store";

function App() {
    document.title = setting.APP_NAME;

    return (
        <Provider store={store}>
            <ThemeProvider theme={mainTheme}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: mainTheme.palette.primary[0],
                        },
                        components: {
                            // Tooltip: {
                            //     colorPrimary: mainTheme.palette.primary[3],
                            // },
                        },
                    }}
                >
                    <RouterProvider
                        router={routes}
                        fallbackElement={<LoadingComponent />}
                    />
                </ConfigProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
