import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import configureAppStore from "./services/store";
import { ThemeProvider } from "styled-components";
import { ConfigProvider } from "antd";
import mainTheme from "./configs/themes";
import { RouterProvider } from "react-router-dom";
import routes from "./configs/routers";
import setting from "./configs/setting";
import "antd/dist/reset.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
document.title = setting.APP_NAME;
const store = configureAppStore();
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={mainTheme}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: mainTheme.palette.primary[0],
                        },
                    }}
                >
                    <RouterProvider router={routes} />
                </ConfigProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
