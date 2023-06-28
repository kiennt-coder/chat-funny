import { styled } from "styled-components";
import { Input } from "antd";
import { font, palette, size } from "styled-theme";

const InputWrapper = styled(Input)`
    &.ant-input {
        padding: calc(${size("padding-2")} + 0.21875rem) ${size("padding-3")};
        font-size: ${size("text")};
        font-family: ${font("primary")};
        background-color: rgba(${palette("rgb", 1)}, 1);
        border-radius: ${size("radius")};
    }

    &.ant-input-affix-wrapper {
        padding: calc(${size("padding-2")} + 0.21875rem) ${size("padding-3")};
        font-size: ${size("text")};
        font-family: ${font("primary")};
        background-color: rgba(${palette("rgb", 1)}, 1);
        border-color: transparent;
        border-radius: ${size("radius")};

        & .ant-input-prefix {
            margin-right: ${size("padding-3")};
            font-size: 1rem;
            color: rgb(${palette("rgb", 0)});
            background-color: rgba(${palette("rgb", 1)}, 1);
        }

        & input {
            color: ${palette("secondary", 9)};
            background-color: rgba(${palette("rgb", 1)}, 1);
            font-weight: normal;

            &::placeholder {
                color: rgb(${palette("rgb", 0)});
                font-weight: normal;
            }
        }
    }
`;

export const PasswordWrapper = styled(Input.Password)``;

export const InputSearchWrapper = styled(Input.Search)``;

export default InputWrapper;
