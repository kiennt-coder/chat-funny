import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useLayoutEffect, useState } from "react";

function asyncComponent(importComponent) {
    function AsyncFunc(props) {
        const [component, setComponent] = useState(undefined);

        useLayoutEffect(() => {
            Nprogress.start();
        }, []);

        useEffect(() => {
            async function getComponent() {
                const { default: Component } = await importComponent();
                setComponent(<Component {...props} />);
            }
            getComponent();
            Nprogress.done();
            return () => {
                Nprogress.remove();
            };
        }, [props]);

        return <>{component}</>;
    }

    return AsyncFunc;
}

export default asyncComponent;
