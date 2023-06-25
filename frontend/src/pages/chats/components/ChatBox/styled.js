import { styled } from "styled-components";
import { size } from "styled-theme";

const ChatBoxWrapper = styled.div``;

export const ChatBoxTitle = styled.h3`
    margin-bottom: ${size("margin-3")};
    padding: 0 ${size("padding-4")};
`;

export const ChatBoxContent = styled.div`
    margin: 0 0.2rem;
    height: calc(100vh - 11.1rem);
    display: flex;
    flex-direction: column;
    overflow: hidden auto;
    scroll-snap-type: y mandatory;

    &::-webkit-scrollbar {
        width: 0;
        background-color: transparent;
    }
`;

export default ChatBoxWrapper;
