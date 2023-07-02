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
import { Suspense, memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
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
import { getList } from "../../services/store/message/slice"
import dayjs from "dayjs"

const ChatDetail = ({...props}) => {
    const params = useParams()
    const dispatch = useDispatch()
    const {
        auth: {user},
        room: {rooms},
        message: {messages}
    } = useSelector(state => state)

    const {id} = params

    useEffect(() => {
        if(id && !messages.find(item => item.roomId === id)) {
            dispatch(getList({roomId: id}))
        }
    }, [id, messages, dispatch])

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

    const renderMessages = list => list.map((item, index) => {
        let userInfo = rooms.find(room => room._id === id)?.users?.find(user => user._id === item.userSendId)
        return (
            <ChatMessage
                key={index}
                align={user?._id === item.userSendId ? "right" : "left"}
                message={{
                    avatar: (list[index+1]?.userSendId === item.userSendId ? "" : "avatar"),
                    text: item.text,
                    username: (list[index+1]?.userSendId === item.userSendId ? "" : userInfo?.nickname),
                    time: dayjs(item.createdAt).format("HH:mm")
                }}
            />
        )
    })

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
                    {
                        renderMessages(messages)
                    }
                    {/* <ChatMessage message={{
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
                    /> */}
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