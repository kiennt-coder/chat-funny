import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useLayoutEffect } from "react";

function LoadingComponent(props) {

    useLayoutEffect(() => {
        nProgress.start();
    }, []);

    useEffect(() => {
        nProgress.set(0.4);
        return () => {
            nProgress.done();
        };
    }, []);

    return <></>;
}

export default LoadingComponent