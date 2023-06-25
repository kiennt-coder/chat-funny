import { useParams } from "react-router-dom"
import
    ChatDetailWrapper,
    {
        ChatDetailBody,
        ChatDetailFooter,
        ChatDetailHeader,
        ChatDetailSendBtn,
        ChatDetailStatus
    }
from "./styled"
import { Suspense, memo } from "react"
import LoadingComponent from "../LoadingComponent"
import { Avatar, Input, Tooltip } from "../uiElements"
import {
    SmileOutlined,
    PaperClipOutlined,
    PictureOutlined,
    SendOutlined,
    SearchOutlined,
    PhoneOutlined,
    VideoCameraOutlined,
    UserOutlined,
    EllipsisOutlined
} from "@ant-design/icons"
import ChatMessage from "../ChatMessage"

const ChatDetail = ({...props}) => {
    const params = useParams()

    const {id} = params

    console.log(id, "id")

    const listHeaderIcons = [
        {
            title: "Tìm kiếm",
            icon: <SearchOutlined />,
        },
        {
            title: "Gọi thoại",
            icon: <PhoneOutlined />,
        },
        {
            title: "Gọi video",
            icon: <VideoCameraOutlined />,
        },
        {
            title: "Thông tin",
            icon: <UserOutlined />,
        },
        {
            title: "Thêm",
            icon: <EllipsisOutlined />,
        },
    ]

    const listFooterIcons = [
        {
            title: "Biểu tượng cảm xúc",
            icon: <SmileOutlined />,
        },
        {
            title: "File đính kèm",
            icon: <PaperClipOutlined />,
        },
        {
            title: "Hình ảnh",
            icon: <PictureOutlined />,
        },
    ]

    const renderIcons = listIcon => {
        return listIcon.map((item, index) => (
            <Tooltip title={item.title} key={index}>
                {item.icon}
            </Tooltip>
        ))
    }

    return (
        <Suspense fallback={<LoadingComponent />}>
            <ChatDetailWrapper {...props}>
                <ChatDetailHeader>
                    <div className="left">
                        <Avatar>K</Avatar>
                        <span className="name">
                            Kiên Trung Ngô
                        </span>
                        <ChatDetailStatus status="online" />
                    </div>

                    <div className="right">
                        {renderIcons(listHeaderIcons)}
                    </div>
                </ChatDetailHeader>

                <ChatDetailBody>
                    <ChatMessage message={{
                        text: "Hello, World!"
                    }} />
                    <ChatMessage message={{
                        text: "Hello, World!"
                    }} />
                    <ChatMessage message={{
                        text: "Hello, World!"
                    }} />
                    <ChatMessage message={{
                        avatar: "K",
                        username: "Kiennt",
                        text: "Hello, World!"
                    }} />
                    <ChatMessage align="right" message={{
                        text: "Hello, World!"
                    }} />
                    <ChatMessage align="right" message={{
                        text: "Hello, World!"
                    }} />
                    <ChatMessage
                        align="right"
                        message={{
                            avatar: "K",
                            username: "Kiennt",
                            text: "Hi"
                        }}
                    />
                </ChatDetailBody>

                <ChatDetailFooter>
                    <Input placeholder="Nhập tin nhắn..." />
                    {renderIcons(listFooterIcons)}

                    <Tooltip title="Gửi tin nhắn">
                        <ChatDetailSendBtn type="primary" icon={<SendOutlined />}></ChatDetailSendBtn>
                    </Tooltip>
                </ChatDetailFooter>
            </ChatDetailWrapper>
        </Suspense>
    )
}

export default memo(ChatDetail)