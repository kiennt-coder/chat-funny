import { Avatar } from "../uiElements"
import { MoreOutlined, ClockCircleOutlined } from "@ant-design/icons"
import ChatMessageWrapper, { ChatMessageAvatar, ChatMessageContent } from "./styled"
import { forwardRef } from "react"

const ChatMessage = forwardRef(({message, align="left", ...props}, ref) => {
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
                        <MoreOutlined />
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