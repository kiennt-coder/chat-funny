import { Col, Layout, Row } from "antd";
import { Outlet } from "react-router-dom";
import { styledContent, styledSider } from "./styled";
import { useDispatch } from "react-redux";
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

    const handleChangeMenuItemSelected = (value="0") => {
        dispatch(setMenuItemActive(value))
    }

    return (
        <Layout>
            <SiderWapper>
                <Logo onChangeMenuItem={handleChangeMenuItemSelected}/>
                <Menu onChangeMenuItem={handleChangeMenuItemSelected}/>
                <UserDropdown />
            </SiderWapper>
            <ContentWrapper>
                <Row>
                    <Col span={8}>
                        <Outlet />
                    </Col>
                    <Col span={16}>
                        <ChatDetail />
                    </Col>
                </Row>
            </ContentWrapper>
        </Layout>
    )
};

export default LayoutMain;
