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

    @media (max-width: 991.98px) {
        flex: 0 0 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        width: 100% !important;
        height: ${size("siderWidth")};
        position: absolute !important;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;

        & .ant-layout-sider-children {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            & .sider__logo {
                display: none;
            }

            & .sider__user-dropdown {
                width: auto;
                padding: 0 10%;
            }
        }
    }
`;

export const styledContent = (componentName) => styled(componentName)`
    &.ant-layout-content {
        background-color: ${palette("secondary", 3)};
    }

    @media (max-width: 991.98px) {
        & .ant-row.content__row {
            flex-wrap: nowrap;
            overflow: hidden;
            justify-content: flex-start;
            position: relative;
        }

        & .content__chat-box {
            position: absolute;
            top: 0;
            left: 100%;
            bottom: 0;
            width: 100%;
            transition: all 0.3s ease-in;

            &.content__chat-box--active {
                left: 0%;
            }
        }
    }
`;
