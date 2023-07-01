import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ConfigProvider } from "antd";
import store from "./services/store";
import mainTheme from "./configs/themes";
import App from "./App";
import "./index.css";
import "antd/dist/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* React-redux provider */}
        <Provider store={store}>
            {/* Styled-theme config provider */}
            <ThemeProvider theme={mainTheme}>
                {/* Antd config provider */}
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: mainTheme.palette.primary[0],
                        },
                    }}
                >
                    <App />
                </ConfigProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
