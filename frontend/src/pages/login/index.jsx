import { Row, Col } from "antd"
import { Link, useNavigate } from "react-router-dom"
import setting from "../../configs/setting"
import Container, { Heading } from "../../assets/css/main"
import LoginWrapper, { LoginText } from "./styled"
import LoginForm from "./components/LoginForm"
import HeartIcon from "../../assets/icons/Heart"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../services/store/auth/slice"
import { useEffect } from "react"

const resonsive = {
    xs: {
        span: 22,
        offset: 1
    },
    sm: {
        span: 20,
        offset: 2
    },
    md: {
        span: 12,
        offset: 6
    },
    lg: {
        span: 8,
        offset: 8
    },
    xl: {
        span: 8,
        offset: 8
    },
    xxl: {
        span: 8,
        offset: 8
    }
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {accessToken} = useSelector(state => state.auth);

    const onSubmit = (data) => {
        dispatch(login(data))
    }

    useEffect(() => {
        accessToken?.token && navigate("/chats")
    }, [accessToken, navigate])

    return (
        <Container>
                <Row>
                    <Col {...resonsive}>
                        <LoginWrapper>
                            <Heading className="text-align-center">
                                Đăng nhập
                            </Heading>

                            <LoginText className="text-align-center">
                                Đăng nhập để tiếp tục đến {setting.APP_NAME}.
                            </LoginText>

                            <LoginForm onSubmit={onSubmit} />

                            <LoginText className="text-align-center">
                                Bạn chưa có tài khoản? {" "}
                                <Link to="/signup">Đăng ký ngay</Link>
                            </LoginText>

                            <LoginText className="text-align-center">
                                © 2023 {setting.APP_NAME}. Create with {<HeartIcon style={{color: "hotpink" }} />} by {setting.AUTHOR}
                            </LoginText>
                        </LoginWrapper>
                    </Col>
                </Row>
        </Container>
    )
}

export default Login