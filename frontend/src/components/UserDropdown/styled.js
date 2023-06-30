import { styled } from "styled-components";
import { size } from "styled-theme";

const UserDropdownWrapper = styled.div`
    width: 100%;
    height: ${size("menuIconWidth")};
    margin: ${size("margin-1")} ${size("margin-0")};
    display: flex;
    align-items: center;
    justify-content: center;

    & .dropdown__avatar {
        cursor: pointer;
    }
`;

export default UserDropdownWrapper;
