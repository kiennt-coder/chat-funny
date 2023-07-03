import { styled } from "styled-components";
import { font, palette, size } from "styled-theme";

const ChatMessageWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: ${({ align }) =>
        align === "right" ? "row-reverse" : "row"};
    justify-content: flex-start;
    margin: ${size("margin-3")} 0;
`;

export const ChatMessageAvatar = styled.div`
    --margin-size: ${size("margin-3")};
    ${({ align }) =>
        align === "right"
            ? `margin-left: var(--margin-size);`
            : `margin-right: var(--margin-size);`}
`;

export const ChatMessageContent = styled.div`
    --font-family-primary: ${font("primary")};
    display: flex;
    flex-direction: column;
    align-items: ${({ align }) =>
        align === "right" ? "flex-end" : "flex-start"};
    justify-content: flex-start;
    font-family: var(--font-family-primary);
    font-weight: 500;

    & .wrap {
        display: flex;
        flex-direction: ${({ align }) =>
            align === "right" ? "row-reverse" : "row"};
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: ${size("margin-3")};

        & .detail {
            --color-primary: ${palette("primary", 1)};
            --color-second: ${palette("color", 0)};
            --bg-color-primary: ${palette("secondary", 3)};
            --bg-color-second: ${palette("color", 2)};
            --border-size: ${size("radius-medium")};
            ${({ align }) =>
                align === "right"
                    ? `
                        border-radius: var(--border-size) var(--border-size) 0 var(--border-size);
                        color: var(--color-primary);
                        background-color: var(--bg-color-primary);
                    `
                    : `
                        border-radius: var(--border-size) var(--border-size) var(--border-size) 0;
                        color: var(--color-second);
                        background-color: var(--bg-color-second);
                    `}
            padding: ${size("padding-3")} ${size("padding-4")};
            position: relative;

            &::after {
                --border-color-primary: ${palette("secondary", 3)};
                --border-color-second: ${palette("color", 2)};
                content: "";
                position: absolute;
                top: 100%;
                display: block;
                border-width: 0.4rem;
                border-style: solid;
                ${({ align }) =>
                    align === "right"
                        ? `
                            border-color: var(--border-color-primary) var(--border-color-primary) transparent transparent;
                            right: 0;
                        `
                        : `
                            border-color: var(--border-color-second) transparent transparent var(--border-color-second);
                            left: 0;
                        `}
            }

            & p {
                margin-bottom: unset;
            }

            & .text {
                font-size: ${size("text-medium")};
                margin-bottom: ${size("margin-2")};
                line-height: 1.6;
                text-align: left;
            }

            & .time {
                --color-primary: hsla(0, 0%, 100%, 0.5);
                --color-second: rgb(${palette("rgb", 0)});
                font-size: 0.75rem;
                ${({ align }) =>
                    align === "right"
                        ? `
                            color: var(--color-second);
                            text-align: left;
                        `
                        : `
                            color: var(--color-primary);
                            text-align: right;
                        `}

                & .anticon {
                    font-size: inherit;
                    margin-right: ${size("margin-1")};
                }
            }
        }

        & .context-menu {
            cursor: pointer;

            & .anticon {
                font-size: 1.5rem;
                color: ${palette("color", 2)};
            }
        }
    }

    & .username {
        color: ${palette("secondary", 8)};
        font-weight: normal;
        font-size: ${size("text-medium")};
    }
`;

export default ChatMessageWrapper;
