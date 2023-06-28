import { styled } from "styled-components";
import { size } from "styled-theme";
import MenuWrapper from "../../../components/uiElements/styled/Menu";

const MenuSiderWrapper = styled(MenuWrapper)`
    &.ant-menu-light.ant-menu-root.ant-menu-inline {
        border-inline-end: unset;
        height: calc(100% - ${size("siderWidth")});
        overflow-x: hidden;
        overflow-y: auto;
        scroll-snap-type: y mandatory;

        &::-webkit-scrollbar {
            width: 0;
            background: transparent;
        }

        & .ant-menu-item {
            padding: 0 1rem !important;
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
`;

export default MenuSiderWrapper;
