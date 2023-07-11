import { Avatar, Dropdown } from "../uiElements"
import { PoweroffOutlined } from "@ant-design/icons"
import UserDropdownWrapper from "./styled"
import { logout } from "../../services/store/auth/slice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"

const UserDropdown = ({...props}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const avatarRef = useRef()
    const {user} = useSelector(state => state.auth)

    const items = [
        {
            label: "Đăng xuất",
            key: "signout",
            icon: <PoweroffOutlined />,
            danger: true,
        }
    ]

    const handleMenuClick = (value) => {
        switch (value.key) {
            case "signout":
                {
                    dispatch(logout());
                    navigate("/signin")
                    break;
                }
        
            default:
                break;
        }
    }

    return (
        <UserDropdownWrapper {...props}>
            <Dropdown
                menu={{
                    items,
                    onClick: handleMenuClick,
                }}
                trigger={['click', 'contextMenu']}
            >
                <Avatar ref={avatarRef} className="dropdown__avatar">
                    {user?.nickname?.slice(0, 1)?.toUpperCase()}
                </Avatar>
            </Dropdown>
        </UserDropdownWrapper>
    )
}

export default UserDropdown;