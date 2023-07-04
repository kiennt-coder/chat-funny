import { Avatar } from "../uiElements"
import { MoreOutlined, ClockCircleOutlined } from "@ant-design/icons"
import ChatMessageWrapper, { ChatMessageAvatar, ChatMessageContent } from "./styled"
import { forwardRef } from "react"
import MenuContext from "../MenuContext"
import setting from "../../configs/setting"
import { useDispatch } from "react-redux"
import { deleteMessage } from "../../services/store/message/slice"

const ChatMessage = forwardRef(({message, align="left", ...props}, ref) => {
    const dispatch = useDispatch()
    const items = [
        {
            label: "Xoá",
            key: "delete",
        }
    ]

    const handleDeleteMessage = (id) => {
        try {
            id && dispatch(deleteMessage({id}))
        } catch (error) {
            message.error(setting.MESSAGES.DEFAULT)
        }
    }

    const handleContextMenuClick = (value) => {
        switch (value.key) {
            case "delete":
                handleDeleteMessage(message?.id)
                break;
        
            default:
                break;
        }
    }

    return (
        <ChatMessageWrapper {...props} align={align} ref={ref}>
            <ChatMessageAvatar align={align}>
                {
                    message?.avatar ? 
                    (
                        <Avatar
                            src="http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg"
                        >
                            K
                        </Avatar>
                    ) 
                    : 
                    (
                        <div style={{width: "2rem", height: "2rem"}}></div>
                    )
                }
            </ChatMessageAvatar>

            <ChatMessageContent align={align}>
                <div className="wrap">
                    <div className="detail">
                        <p className="text">
                            {message?.text ? message.text : ""}
                        </p>

                        <p className="time">
                            <ClockCircleOutlined />
                            <span>{message?.time ? message.time : "just now"}</span>
                        </p>
                    </div>

                    <div className="context-menu">
                        <MenuContext
                            menu={{
                                items,
                                onClick: handleContextMenuClick
                            }}
                            placement={align && align.includes("right") ? "left" : "right"}
                        >
                            <MoreOutlined />
                        </MenuContext>
                    </div>
                </div>

                {message?.username && 
                    (<div className="username">
                        {message.username}
                    </div>)
                }
                
            </ChatMessageContent>
        </ChatMessageWrapper>
    )
})

export default ChatMessage