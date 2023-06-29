import { LoginFormWrapper } from "../styled"
import {UserOutlined, LockOutlined} from "@ant-design/icons"
import {Button, Form, FormItem, Input, Password} from "../../../components/uiElements"
import { Link } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import setting from "../../../configs/setting";
import { createRef, useEffect, useId } from "react";
import {pasteNotAllowFunc} from "../../../utils";

const RegisterForm = ({onSubmit, ...props}) => {
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} không được để trống!',
        whitespace: '${label} không được chứa ký tự khoảng trống!',
        string: {
            min: '${label} tối thiểu có ${min} ký tự',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const {loading} = useSelector(state => state.auth)
    const [form] = useForm()
    const reCaptchaRef = createRef()
    const passwordId = useId()

    const handleResetForm = () => {
        reCaptchaRef.current.reset()
        form.setFieldValue("reCaptcha", undefined)
    }

    const onFinish = (data) => {
        onSubmit(data)
        handleResetForm()
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
        pasteNotAllowFunc(passwordId)
    }, [passwordId])

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
                        },
                        {
                            pattern: /^([\w]{3,20})$/gmu,
                            message: '${label} không chứa các ký tự đặc biệt, khoảng trắng!'
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
                        },
                        {
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])\S{8,20}$/gm,
                            message: '${label} nên có tối thiểu 8 ký tự và chứa một ký tự thường, một ký tự hoa, một số, một ký tự đặc biệt!',
                        },
                    ]}
                    tooltip={<Link to="/" style={{color: "#fff"}}>Forget password?</Link>}
                >
                    <Password
                        addonBefore={<LockOutlined />}
                        placeholder="Nhập mật khẩu"
                        id={passwordId}
                    />
                </FormItem>

                <FormItem
                    label="Nhập lại mật khẩu"
                    name={["user", "confirmPassword"]}
                    dependencies={['user','password']}
                    rules={[
                        {
                            required: true,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue(['user', 'password']) === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Password
                        addonBefore={<LockOutlined />}
                        placeholder="Nhập lại mật khẩu"
                    />
                </FormItem>

                <FormItem
                    name="reCaptcha"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <ReCAPTCHA
                        sitekey={setting.SITE_KEY}
                        ref={reCaptchaRef}
                        style={{
                            marginTop: "0.5rem"
                        }}
                    />
                </FormItem>

                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        style={{
                            marginTop: "0.5rem"
                        }}
                    >
                        Đăng ký
                    </Button>
                </FormItem>
            </Form>
        </LoginFormWrapper>
    )
}

export default RegisterForm