import { styled } from "styled-components";
import { font, palette, size } from "styled-theme";

const PageStyled = styled.div`
    font-family: ${font("primary")};
`;

export const PageHeader = styled.div`
    padding: ${size("padding-4")} ${size("padding-4")} 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${size("margin-4")};
`;

export const PageHeading = styled.h1`
    margin-bottom: unset;
    font-size: ${size("heading")};
    font-family: ${font("primary")};
    font-weight: 600;
    color: ${palette("primary", 1)};
    flex: 1 1;
`;

export const PageAction = styled.div``;

export const PageFilter = styled.div`
    padding: 0 ${size("padding-4")};
    margin-bottom: ${size("margin-4")};
`;

export const PageBody = styled.div``;

export default PageStyled;
