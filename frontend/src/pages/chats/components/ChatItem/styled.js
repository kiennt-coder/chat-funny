import { styled } from "styled-components";
import { font, palette, size } from "styled-theme";

const ChatItemWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${size("margin-3")};
    font-family: ${font("primary")};
    padding: ${size("padding-3")} ${size("padding-4")};
    border-radius: ${size("radius")};
    scroll-snap-align: start;
    transition: all 0.3s linear;
    margin-bottom: ${size("margin-1")};

    &:hover {
        background-color: rgba(${palette("rgb", 1)}, 1);
    }
`;

export const ChatItemAvatar = styled.div`
    flex-shrink: 0;
`;

export const ChatItemContent = styled.div`
    flex-grow: 1;
`;

export const ChatItemTitle = styled.h5`
    font-size: ${size("text-medium")};
    color: ${palette("secondary", 9)};
    font-weight: 600;
    font-family: ${font("primary")};

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
`;

export const ChatItemSubTitle = styled.p`
    font-size: ${size("text")};
    color: rgb(${palette("rgb", 0)});
    font-weight: normal;
    font-family: ${font("primary")};
    margin-bottom: unset;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
`;

export const ChatItemMore = styled.div`
    flex-shrink: 0;
    font-size: ${size("text-small")};
    color: rgb(${palette("rgb", 0)});
    font-weight: normal;
    font-family: ${font("primary")};
`;

export default ChatItemWrapper;
