import { Link } from "react-router-dom"
import { Avatar } from "../../../../components/uiElements"
import 
    ChatItemWrapper, 
    {
        ChatItemMore,ChatItemContent, ChatItemAvatar,
        ChatItemSubTitle, ChatItemTitle
    } from "./styled"

const ChatItem = ({to="", room, ...props}) => {

    return (
        <Link to={to}>
            <ChatItemWrapper {...props}>
                <ChatItemAvatar>
                    <Avatar
                        size="large"
                        src={room?.avatar}
                        alt={room?.name}
                    >
                        {room?.name?.slice(0, 1).toUpperCase()}
                    </Avatar>
                </ChatItemAvatar>
                <ChatItemContent>
                    <ChatItemTitle>
                        {room?.name}
                    </ChatItemTitle>
                    <ChatItemSubTitle>
                        hello, world! okay sure😄👍
                    </ChatItemSubTitle>
                </ChatItemContent>
                <ChatItemMore>
                    <span>02:35 PM</span>
                </ChatItemMore>
            </ChatItemWrapper>
        </Link>
    )
}

export default ChatItem