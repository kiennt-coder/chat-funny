import { styled } from "styled-components";
import { Menu } from "antd";

const MenuWrapper = styled(Menu)`
    &.ant-menu-light.ant-menu-root.ant-menu-inline {
        border-inline-end: unset;
    }
`;

export default MenuWrapper;
