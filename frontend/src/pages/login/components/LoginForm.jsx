import { LoginFormWrapper } from "../styled"
import {UserOutlined, LockOutlined} from "@ant-design/icons"
import {Button, Checkbox, Form, FormItem, Input, Password} from "../../../components/uiElements"
import { Link } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

const LoginForm = ({onSubmit, ...props}) => {
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} không được để trống!'
    };
    /* eslint-enable no-template-curly-in-string */

    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [form] = useForm()

    const onFinish = (data) => {
        setLoadingSubmit(false)
        console.log(data)
        onSubmit(data)
    }

    const onFinishFailed = (data) => {
        setLoadingSubmit(false)
        console.log(data)
        form.scrollToField(data.errorFields[0].name, {
            behavior: 'smooth',
            scrollMode: 'if-needed',
            block: "center",
            inline: "center"
        })
    }

    return (
        <LoginFormWrapper>
            <Form
                name="loginform"
                layout="vertical"
                form={form}
                validateMessages={validateMessages}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <FormItem
                    label="Tài khoản"
                    name={["user", "username"]}
                    rules={[
                        {
                            required: true,
                        }
                    ]}
                >
                    <Input
                        autoFocus
                        addonBefore={<UserOutlined />}
                        placeholder="Nhập tài khoản"
                    />
                </FormItem>

                <FormItem
                    label="Mật khẩu"
                    name={["user", "password"]}
                    rules={[
                        {
                            required: true,
                        }
                    ]}
                    tooltip={<Link to="/" style={{color: "#fff"}}>Forget password?</Link>}
                >
                    <Password
                        addonBefore={<LockOutlined />}
                        placeholder="Nhập mật khẩu"
                    />
                </FormItem>

                <FormItem
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>
                        Ghi nhớ
                    </Checkbox>
                </FormItem>

                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loadingSubmit}
                        onClick={() => setLoadingSubmit(true)}
                    >
                        Đăng nhập
                    </Button>
                </FormItem>
            </Form>
        </LoginFormWrapper>
    )
}

export default LoginForm