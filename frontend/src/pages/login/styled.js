import { styled } from "styled-components";
import { font, palette, size } from "styled-theme";

const LoginWrapper = styled.div`
    padding: ${size("padding-5")} ${size("padding-0")} ${size("padding-5")}
        ${size("padding-0")};
    margin-top: ${size("margin-5")};
`;

export const LoginText = styled.p`
    font-size: ${size("text-medium")};
    margin-bottom: ${size("margin-3")};
    font-family: ${font("primary")};
`;

/*------------------------------ Login Form -------------------------------*/
export const LoginFormWrapper = styled.div`
    background-color: ${palette("primary", 3)};
    padding: ${size("margin-4")};
    border-radius: ${size("radius-medium")};
    margin-top: ${size("margin-4")};
    margin-bottom: ${size("margin-5")};
`;

export default LoginWrapper;
