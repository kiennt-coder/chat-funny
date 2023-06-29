import { Row, Col } from "antd"
import { Link, useNavigate } from "react-router-dom"
import setting from "../../configs/setting"
import Container, { Heading } from "../../assets/css/main"
import LoginWrapper, { LoginText } from "./styled"
import LoginForm from "./components/RegisterForm"
import HeartIcon from "../../assets/icons/Heart"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../services/store/auth/slice"
import { useEffect } from "react"

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth)

    const onSubmit = (data) => {
        const {confirmPassword, ...user} = data.user
        dispatch(register(user))
    }

    useEffect(() => {
        Object.keys(user).length && navigate("/signin")
    }, [user, navigate])

    return (
        <Container>
                <Row>
                    <Col span={8} offset={8}>
                        <LoginWrapper>
                            <Heading className="text-align-center">
                                Đăng ký
                            </Heading>

                            <LoginText className="text-align-center">
                                Đăng ký để tiếp tục đến {setting.APP_NAME}.
                            </LoginText>

                            <LoginForm onSubmit={onSubmit} />

                            <LoginText className="text-align-center">
                                Bạn đã có tài khoản? {" "}
                                <Link to="/signin">Đăng nhập ngay</Link>
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

export default Signup