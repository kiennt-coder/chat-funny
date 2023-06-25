import { styled } from "styled-components";
import { Form } from "antd";
import { font, palette, size } from "styled-theme";

const FormItemWrapper = styled(Form.Item)`
    .ant-input-group-addon,
    .ant-input,
    .ant-input-affix-wrapper,
    .ant-btn,
    .ant-form-item-label,
    .ant-checkbox-wrapper {
        font-family: ${font("primary")};
        font-size: ${size("text")};
    }

    .ant-form-item-label {
        font-size: ${size("text-medium")};
        font-weight: 500;
    }

    .ant-input-group-addon,
    .ant-input,
    .ant-input-affix-wrapper,
    .ant-btn {
        padding: ${size("padding-2")} ${size("padding-3")};
    }

    .ant-btn {
        height: unset;
        // background-color: ${palette("primary", 0)};

        // &:hover {
        //     background-color: ${palette("primary", 5)};
        // }
    }

    .ant-form-item-label label {
        width: 100%;
    }
`;

export default FormItemWrapper;
