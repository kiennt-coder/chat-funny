import { styled } from "styled-components";
import { size } from "styled-theme";

const LogoWrapper = styled.div`
    line-height: ${size("siderWidth")};
    text-align: center;

    & img {
        height: 1.875rem;
    }
`;

export default LogoWrapper;
