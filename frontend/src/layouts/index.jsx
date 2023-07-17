import { Col, Layout, Row } from "antd";
import { Outlet } from "react-router-dom";
import { styledContent, styledSider } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItemActive } from "../services/store/app/slice"
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import ChatDetail from "../components/ChatDetail";
import UserDropdown from "../components/UserDropdown";

const { Sider, Content } = Layout;
const SiderWapper = styledSider(Sider)
const ContentWrapper = styledContent(Content)

const LayoutMain = () => {
    const dispatch = useDispatch()
    const {chatDetailActive} = useSelector(state => state.app)

    const handleChangeMenuItemSelected = (value="0") => {
        dispatch(setMenuItemActive(value))
    }

    return (
        <Layout>
            <SiderWapper>
                <Logo className="sider__logo" onChangeMenuItem={handleChangeMenuItemSelected}/>
                <Menu onChangeMenuItem={handleChangeMenuItemSelected}/>
                <UserDropdown className="sider__user-dropdown" />
            </SiderWapper>
            <ContentWrapper>
                <Row className="content__row">
                    <Col
                        xs={{
                            span: 24
                        }}
                        sm={{
                            span: 24
                        }}
                        md={{
                            span: 24
                        }} 
                        lg={{
                            span: 8
                        }}
                        xl={{
                            span: 8
                        }}
                        xxl={{
                            span: 8
                        }}
                    >
                        <Outlet />
                    </Col>
                    <Col
                         className={`content__chat-box${chatDetailActive ? " content__chat-box--active" : ""}`}
                        xs={{
                            span: 24
                        }}
                        sm={{
                            span: 24
                        }}
                        md={{
                            span: 24
                        }} 
                        lg={{
                            span: 16
                        }}
                        xl={{
                            span: 16
                        }}
                        xxl={{
                            span: 16
                        }}
                    >
                        <ChatDetail />
                    </Col>
                </Row>
            </ContentWrapper>
        </Layout>
    )
};

export default LayoutMain;
