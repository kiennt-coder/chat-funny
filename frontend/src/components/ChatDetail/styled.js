import styled from "styled-components";
import { font, palette, size } from "styled-theme";
import { Button } from "../uiElements";

const ChatDetailWrapper = styled.div`
    background-color: ${palette("primary", 3)};
    min-height: 100vh;
    max-height: 99.7%;
    height: 100vh;
    box-shadow: 0 2px 4px ${palette("rgba", 0)};
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const ChatDetailBox = styled.div`
    padding: ${size("padding-4")};
    border-bottom: 0.1rem solid ${palette("secondary", 4)};
`;

const handleStatusColor = (statusName) => {
    let color = 12;

    switch (statusName) {
        case "online":
            color = 9;
            break;

        case "focus":
            color = 8;
            break;

        case "busy":
            color = 6;
            break;

        default:
            color = 12;
            break;
    }

    return color;
};

export const ChatDetailHeader = styled(ChatDetailBox)`
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .left {
        & .ant-avatar {
            margin-right: ${size("margin-3")};
        }

        & .name {
            font-weight: 600;
            font-family: ${font("primary")};
            font-size: ${size("text-medium")};
        }
    }

    & .right {
        & > .anticon {
            padding: ${size("text-small")};
            color: rgb(${palette("rgb", 0)});
            cursor: pointer;
            font-size: 1.2rem;
            transition: all 0.3s linear;

            &:hover {
                background-color: ${palette("primary", 0)};
                border-radius: ${size("radius")};
                color: ${palette("primary", 3)};
            }
        }
    }
`;

export const ChatDetailStatus = styled.span`
    display: inline-block;
    position: relative;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${({ status }) =>
        palette("color", handleStatusColor(status))};
    margin-left: ${size("margin-1")};

    &:before {
        --size: 40%;
        content: "";
        display: block;
        background-color: ${palette("color", 0)};
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const ChatDetailBody = styled.div`
    flex-grow: 1;
    padding: 0 ${size("padding-3")};
    overflow-x: hidden;
    overflow-y: auto;
`;

export const ChatDetailFooter = styled(ChatDetailBox)`
    flex-shrink: 0;
    border-bottom: unset;
    border-top: 0.1rem solid ${palette("secondary", 4)};

    & form#formAddMessage {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.4rem;
    }

    & .ant-form-item {
        margin-inline-end: unset;
        text-align: center;
    }

    & .form__input {
        flex: 1;
    }

    & .form__action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.4rem;
    }

    & .form__action--icon .anticon {
        padding: ${size("text-small")};
        color: ${palette("primary", 0)};
        cursor: pointer;
        font-size: 1.5rem;
        transition: all 0.3s linear;

        &:hover {
            background-color: rgb(${palette("rgb", 1)});
            border-radius: ${size("radius")};
        }
    }

    & .form__btn--submit .ant-btn {
        padding: calc(${size("padding-2")} + 0.21875rem) ${size("padding-3")};
    }

    & .ant-upload-list {
        display: none;
    }
`;

export const ChatDetailSendBtn = styled(Button)`
    height: unset;
    padding: calc(${size("padding-2")} + 0.21875rem) ${size("padding-3")};

    &.ant-btn.ant-btn-icon-only {
        width: unset;
        padding-inline-start: ${size("padding-3")};
        padding-inline-end: ${size("padding-3")};
    }
`;

export default ChatDetailWrapper;
