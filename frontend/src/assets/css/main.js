import { styled } from "styled-components";
import { font, palette, size } from "styled-theme";

const Container = styled.div`
    max-width: 100%;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    font-family: ${font("primary")};
    background-color: ${palette("primary", 2)};
    color: ${palette("primary", 1)};
    font-size: ${size("text")};
`;

export const Heading = styled.h1`
    font-size: ${size("heading")};
    font-family: ${font("primary")};
    font-weight: normal;
    margin-bottom: ${size("margin-2")};
`;

export default Container;
