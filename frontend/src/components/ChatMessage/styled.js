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

export const ChatMessageFileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
`;

export const ChatMessageFile = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    color: ${palette("primary", 1)};
    padding: ${size("padding-2")};
    border-radius: ${size("radius")};
    background-color: ${palette("primary", 3)};

    & .file__icon {
        padding: 0.75rem ${size("padding-3")};
        border-radius: ${size("radius-medium")};
        background-color: ${palette("secondary", 3)};

        & svg {
            fill: ${palette("color", 2)};
            font-size: ${size("text-medium")};
        }
    }

    & .file__content {
        & .file__name {
            font-size: ${size("text")};
        }

        & .file__size {
            font-size: ${size("text")};
            color: ${palette("secondary", 7)};
        }
    }

    & .file__action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        & .anticon {
            cursor: pointer;
            svg {
                font-size: 1.5rem;
                color: ${palette("secondary", 1)};
            }
        }
    }
`;

export const ChatMessageImageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    margin-top: ${size("margin-2")};
`;

export const ChatMessageImage = styled.div`
    width: 9.375rem;
    height: 6.25rem;
    border-radius: ${size("radius")};
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;

    & .image__overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: ${palette("rgba", 1)};
        z-index: 1;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
    }

    & .image__action {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s ease-in-out;

        & .anticon {
            cursor: pointer;
        }

        & svg {
            font-size: ${size("iconSiderWidth")};
            color: ${palette("color", 0)};
        }
    }

    &:hover {
        & .image__overlay {
            opacity: 1;
            visibility: visible;
        }

        & .image__action {
            opacity: 1;
            visibility: visible;
        }
    }
`;

export default ChatMessageWrapper;
