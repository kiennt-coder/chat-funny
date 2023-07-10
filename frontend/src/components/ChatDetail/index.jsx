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
import { Suspense, createRef, memo, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LoadingComponent from "../LoadingComponent"
import { Avatar, Form, FormItem, Input, Tooltip } from "../uiElements"
import {Form as FormAnt, Popover} from "antd"
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
import { createMessage, createMessageFulfilled, getList } from "../../services/store/message/slice"
import dayjs from "dayjs"
import EmojiPicker from "emoji-picker-react"
import { socket } from "../../services/socket"

const ChatDetail = ({...props}) => {
    const dispatch = useDispatch()
    const {
        auth: {user},
        room: {rooms, activeRoom},
        message: {messages}
    } = useSelector(state => state)
    const emojiPickerRef = createRef()
    const [form] = FormAnt.useForm()
    const [lastMessageEl, setLasMessageEl] = useState()

    useEffect(() => {
        console.log("socket::", socket.id)

        socket.on("joinRoomSuccess", (data) => {
            console.log("join room success")
        })

        socket.on("sendMessageSuccess", (data) => {
           dispatch(createMessageFulfilled({savedMessage: data}))
        })

        
    }, [socket.id])
    
    useEffect(() => {
        lastMessageEl &&
        activeRoom.length &&
        lastMessageEl.scrollIntoView({
            behavior: "smooth", block: "end", inline: "nearest"
        })
    }, [lastMessageEl, activeRoom])

    useEffect(() => {
        handleGetMessages()
    }, [activeRoom])

    function handleGetMessages() {
        if(activeRoom.length && !messages.find(item => item.roomId === activeRoom)) {
            dispatch(getList({roomId: activeRoom}))
        }
    }

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
            name: "emoji",
            title: "Biểu tượng cảm xúc",
            icon: (<Popover
                content={<EmojiPicker ref={emojiPickerRef} onEmojiClick={handleEmojiClick} />}
                trigger="click"
                >
                <SmileOutlined />
            </Popover>),
        },
        {
            name: "file",
            title: "File đính kèm",
            icon: <PaperClipOutlined />,
        },
        {
            name: "image",
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

    const renderFormItemIcons = listIcon => {
        return listIcon.map((item, index) => (
            <FormItem name={item.name} key={index} className="form__action--icon">
                <Tooltip title={item.title}>
                    {item.icon}
                </Tooltip>
            </FormItem>
        ))
    }

    const renderMessages = list => list.map((item, index) => {
        let userInfo = rooms.find(room => room._id === activeRoom)?.users?.find(user => user._id === item.userSendId)
        return (
            <ChatMessage
                key={index}
                align={user?._id === item.userSendId ? "right" : "left"}
                message={{
                    id: item._id,
                    avatar: (list[index+1]?.userSendId === item.userSendId ? "" : "avatar"),
                    text: item.text,
                    username: (list[index+1]?.userSendId === item.userSendId ? "" : userInfo?.nickname),
                    time: dayjs(item.createdAt).format("HH:mm")
                }}
                ref={element => index === list.length-1 && setLasMessageEl(element)}
            />
        )
    })

    const handleSubmit = (values) => {

        let room = rooms.find(room => room._id === activeRoom)

        let data = {
            roomId: room._id,
            userSendId: user._id,
            userReveiceId: room.users.find(item => item._id !== user._id)._id,
            text: values.text,
            files: [],
            isSeen: [user._id],
        }

        dispatch(createMessage(data))

        form.resetFields()
    }

    function handleEmojiClick (emojiData) {
        let oldText = form.getFieldValue("text") || ""
        form.setFieldValue("text", oldText + emojiData.emoji)
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
                    {
                        renderMessages(messages)
                    }
                </ChatDetailBody>

                <ChatDetailFooter>
                    <Form
                        form={form}
                        name="formAddMessage"
                        onFinish={handleSubmit}
                        layout="inline"
                        style={{width: "100%"}}
                    >
                        <FormItem
                            name="text"
                            className="form__input"
                        >
                            <Input placeholder="Nhập tin nhắn..." />
                        </FormItem>

                        {renderFormItemIcons(listFooterIcons)}
                        
                        <FormItem className="form__btn--submit">
                            <Tooltip title="Gửi tin nhắn">
                                <ChatDetailSendBtn
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SendOutlined />}
                                ></ChatDetailSendBtn>
                            </Tooltip>
                        </FormItem>
                    </Form>
                </ChatDetailFooter>
            </ChatDetailWrapper>
        </Suspense>
    )
}

export default memo(ChatDetail)