import { LoginFormWrapper } from "../styled"
import {UserOutlined, LockOutlined} from "@ant-design/icons"
import {Button, Checkbox, Form, FormItem, Input, Password} from "../../../components/uiElements"
import { Link } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LoginForm = ({onSubmit, ...props}) => {
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} không được để trống!'
    };
    /* eslint-enable no-template-curly-in-string */

    const {user, loading} = useSelector(state => state.auth);

    const [form] = useForm()

    const onFinish = (data) => {
        onSubmit(data)
    }

    const onFinishFailed = (data) => {
        form.scrollToField(data.errorFields[0].name, {
            behavior: 'smooth',
            scrollMode: 'if-needed',
            block: "center",
            inline: "center"
        })
    }

    useEffect(() => {
        Object.keys(user).length && form.setFieldValue(["user", "username"], user.username)
    }, [user])

    return (
        <LoginFormWrapper {...props}>
            <Form
                name="loginform"
                layout="vertical"
                form={form}
                validateMessages={validateMessages}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    remember: false
                }}
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
                        loading={loading}
                    >
                        Đăng nhập
                    </Button>
                </FormItem>
            </Form>
        </LoginFormWrapper>
    )
}

export default LoginForm