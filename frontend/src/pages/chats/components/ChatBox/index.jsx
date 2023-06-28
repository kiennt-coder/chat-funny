import ChatBoxWrapper, { ChatBoxContent, ChatBoxTitle } from "./styled"

const ChatBox = ({children, title="Gần đây", ...props}) => {

    return (
        <ChatBoxWrapper {...props}>
            <ChatBoxTitle>{title}</ChatBoxTitle>
            {children && 
                (<ChatBoxContent>{children}</ChatBoxContent>)
            }
        </ChatBoxWrapper>
    )
}

export default ChatBox