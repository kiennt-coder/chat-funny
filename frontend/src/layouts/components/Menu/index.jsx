import { Link } from "react-router-dom";
import MenuSiderWrapper from "./styled";
import {
    UsergroupAddOutlined,
    UserOutlined,
    MessageOutlined,
} from '@ant-design/icons';
import { Tooltip } from "../../../components/uiElements";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Menu = ({
    mode="inline", 
    defaultSelectedKeys=[], 
    onChangeMenuItem=function(){},
     ...props
}) => {
    const dispatch = useDispatch()
    const MenuItemActive = useSelector(state => state.app.menuItemActive);

    const [menuItemSelected, setMenuItemSelected] = useState(MenuItemActive)

    useEffect(() => {
        setMenuItemSelected(MenuItemActive)
    }, [MenuItemActive])

    const items = [
        {
            key: 'profile',
            label:
                <Tooltip title="Thông tin người dùng">
                    <Link to="/profile">
                        <UserOutlined />
                    </Link>
                </Tooltip>
            ,
        },
        {
            key: 'chats',
            label:
                <Tooltip title="Nhắn tin">
                    <Link to="/chats">
                        <MessageOutlined />
                    </Link>
                </Tooltip>
            ,
        },
        {
            key: 'groups',
            label:
                <Tooltip title="Nhóm">
                    <Link to="/groups">
                        <UsergroupAddOutlined />
                    </Link>
                </Tooltip>
            ,
        },
    ]

    return (
        <MenuSiderWrapper
            {...props}
            mode={mode}
            defaultSelectedKeys={defaultSelectedKeys}
            selectedKeys={[menuItemSelected]}
            items={items}
            onSelect={({key}) => onChangeMenuItem(key)}
        />
    )
}

export default memo(Menu)