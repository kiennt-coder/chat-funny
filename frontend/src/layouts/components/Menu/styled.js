import { styled } from "styled-components";
import { size } from "styled-theme";
import MenuWrapper from "../../../components/uiElements/styled/Menu";

const MenuSiderWrapper = styled(MenuWrapper)`
    &.ant-menu-light.ant-menu-root.ant-menu-inline {
        border-inline-end: unset;
        max-height: calc(100% - (${size("siderWidth")} + 3.983rem));
        height: fit-content;
        overflow-x: hidden;
        overflow-y: auto;
        scroll-snap-type: y mandatory;

        &::-webkit-scrollbar {
            width: 0;
            background: transparent;
        }

        & .ant-menu-item {
            padding: 0 !important;
            justify-content: center;
            height: ${size("menuIconWidth")};
            width: ${size("menuIconWidth")};
            margin: 0.4375rem auto;
            scroll-snap-align: start;
            scroll-snap-stop: always;
        }

        & .ant-menu-title-content {
            text-align: center;

            & a {
                display: block;
                line-height: ${size("iconSiderWidth")};
            }

            & .anticon {
                font-size: ${size("iconSiderWidth")};
            }
        }
    }

    @media (max-width: 991.98px) {
        display: flex;
        flex-direction: row;
        max-height: 100% !important;
        align-items: center;
        justify-content: space-between;
    }
`;

export default MenuSiderWrapper;
