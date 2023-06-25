import { Row, Col } from "antd"
import { Link, useNavigate } from "react-router-dom"
import setting from "../../configs/setting"
import Container, { Heading } from "../../assets/css/main"
import LoginWrapper, { LoginText } from "./styled"
import LoginForm from "./components/LoginForm"
import HeartIcon from "../../assets/icons/Heart"

const Login = () => {
    const navigate = useNavigate();

    const onSubmit = (data) => {
        navigate("/")
    }
    return (
        <Container>
                <Row>
                    <Col span={8} offset={8}>
                        <LoginWrapper>
                            <Heading className="text-align-center">
                                Đăng nhập
                            </Heading>

                            <LoginText className="text-align-center">
                                Đăng nhập để tiếp tục đến {setting.APP_NAME}.
                            </LoginText>

                            <LoginForm onSubmit={onSubmit} />

                            <LoginText className="text-align-center">
                                Bạn chưa có tài khoản?
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