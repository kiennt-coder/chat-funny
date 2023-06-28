import { styled } from "styled-components";
import { size, palette } from "styled-theme";

export const styledSider = (componentName) => styled(componentName)`
    flex: 0 0 ${size("siderWidth")} !important;
    max-width: ${size("siderWidth")} !important;
    min-width: ${size("siderWidth")} !important;
    width: ${size("siderWidth")} !important;
    height: 100vh;
    overflow: hidden;

    &.ant-layout-sider {
        background: ${palette("primary", 3)};
        box-shadow: 0 2px 4px ${palette("rgba", 0)};
    }
`;

export const styledContent = (componentName) => styled(componentName)`
    &.ant-layout-content {
        background-color: ${palette("secondary", 3)};
    }
`;
