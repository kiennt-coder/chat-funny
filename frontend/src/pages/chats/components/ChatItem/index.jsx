import { Link } from "react-router-dom"
import { Avatar } from "../../../../components/uiElements"
import 
    ChatItemWrapper, 
    {
        ChatItemMore,ChatItemContent, ChatItemAvatar,
        ChatItemSubTitle, ChatItemTitle
    } from "./styled"

const ChatItem = ({to="", ...props}) => {

    return (
        <Link to={to}>
            <ChatItemWrapper {...props}>
                <ChatItemAvatar>
                    <Avatar
                        size="large"
                    >
                        K
                    </Avatar>
                </ChatItemAvatar>
                <ChatItemContent>
                    <ChatItemTitle>
                        Kiên Trung Ngô
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