import
    ChatDetailWrapper,
    {
        ChatDetaiBackBtn,
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
import {Form as FormAnt, Popover, Upload, message} from "antd"
import {
    SmileOutlined,
    PaperClipOutlined,
    PictureOutlined,
    SendOutlined,
    SearchOutlined,
    PhoneOutlined,
    VideoCameraOutlined,
    UserOutlined,
    EllipsisOutlined,
    LeftOutlined,
} from "@ant-design/icons"
import ChatMessage from "../ChatMessage"
import { createMessage, createMessageFulfilled, getList } from "../../services/store/message/slice"
import dayjs from "dayjs"
import EmojiPicker from "emoji-picker-react"
import { socket } from "../../services/socket"
import setting from "../../configs/setting"
import config from "../../pages/chats/config"
import { setChatDetailActive } from "../../services/store/app/slice"

const ChatDetail = ({...props}) => {
    const dispatch = useDispatch()
    const {
        auth: {user},
        room: {rooms, activeRoom},
        message: {messages},
    } = useSelector(state => state)
    const {FILE_TYPES, IMAGE_TYPES, ERR_SEND_MESSAGE} = setting

    const emojiPickerRef = createRef()
    const [form] = FormAnt.useForm()
    const [roomDetail, setRoomDetail] = useState()
    const [lastMessageEl, setLasMessageEl] = useState()

    const uploadFileProps = {
        name: "files",
        maxCount: 5,
        multiple: true,
        accept: FILE_TYPES.join(", "),
        beforeUpload: (file, fileList) => {
            const isType = FILE_TYPES.includes(file.type);
            if (!isType) {
                message.error(`Chỉ nhận tệp word, excel, powerpoint, pdf.`);
            }
            return false
        },
    }

    const uploadImageProps = {
        name: "images",
        maxCount: 10,
        multiple: true,
        accept: IMAGE_TYPES.join(", "),
        beforeUpload: (file, fileList) => {
            const isType = IMAGE_TYPES.includes(file.type);
            if (!isType) {
                message.error(`Chỉ nhận tệp ${IMAGE_TYPES.join(", ")}.`)
            }
            return false
        }
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem(setting.LOCAL_STORAGE.USER))
        socket.emit("joinRoom", user);

        socket.on("sendMessageSuccess", (data) => {
           dispatch(createMessageFulfilled({savedMessage: data}))
        })
    }, [])
    
    useEffect(() => {
        lastMessageEl &&
        activeRoom.length &&
        lastMessageEl.scrollIntoView({
            behavior: "smooth", block: "end", inline: "nearest"
        })
    }, [lastMessageEl, activeRoom])

    useEffect(() => {
        let room = rooms.find(room => room._id === activeRoom)
        setRoomDetail(room)
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
            name: "files",
            title: "File đính kèm",
            icon: (
                <Upload {...uploadFileProps}>
                    <PaperClipOutlined />
                </Upload>
            ),
        },
        {
            name: "images",
            title: "Hình ảnh",
            icon: (
                <Upload {...uploadImageProps}>
                    <PictureOutlined />
                </Upload>
            ),
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
            <Tooltip key={index} title={item.title}>
                <FormItem name={item.name} className="form__action--icon">
                    {item.icon}
                </FormItem>
            </Tooltip>
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
                    files: item.files.filter(file => file !== null),
                    images: item.images.filter(image => image !== null),
                    username: (list[index+1]?.userSendId === item.userSendId ? "" : userInfo?.nickname),
                    time: dayjs(item.createdAt).format("HH:mm")
                }}
                ref={element => index === list.length-1 && setLasMessageEl(element)}
            />
        )
    })

    const handleUpload = async (type, fileList) => {
        return await config.UploadFormData(type, fileList)
    }

    const handleSubmit = async (values) => {
        const {files, images} = values
        const formFiles = new FormData()
        const formImages = new FormData()
        let uploadFiles = null
        let uploadImages = null

        try {
            if(files && files?.fileList?.length) {
                files.fileList.forEach(item => {
                    formFiles.append("files", item.originFileObj)
                })
                
                uploadFiles = await handleUpload("files", formFiles)
            }

            if(images && images?.fileList?.length) {
                images.fileList.forEach(item => {
                    formImages.append("images", item.originFileObj)
                })
                
                uploadImages = await handleUpload("images", formImages)
            }
            
            console.log({
                uploadFiles,
                uploadImages
            })

            let room = rooms.find(room => room._id === activeRoom)

            let data = {
                roomId: room._id,
                userSendId: user._id,
                userReveiceId: room.users.find(item => item._id !== user._id)._id,
                text: values.text,
                files: uploadFiles ? [...uploadFiles] : [] ,
                images: uploadImages ? [...uploadImages] : [],
                isSeen: [user._id],
            }

            dispatch(createMessage(data))
        } catch (error) {
            message.error(ERR_SEND_MESSAGE)
        }

        form.resetFields()
    }

    function handleEmojiClick (emojiData) {
        let oldText = form.getFieldValue("text") || ""
        form.setFieldValue("text", oldText + emojiData.emoji)
    }

    function handleBackChatDetail() {
        dispatch(setChatDetailActive(false))
    }

    return (
        <Suspense fallback={<LoadingComponent />}>
            <ChatDetailWrapper {...props}>
                <ChatDetailHeader>
                    <div className="left">
                        <ChatDetaiBackBtn onClick={handleBackChatDetail}>
                            <LeftOutlined />
                        </ChatDetaiBackBtn>
                        <Avatar>
                            {
                                roomDetail && roomDetail.type ?
                                roomDetail.name?.slice(0, 1)?.toUpperCase() : roomDetail?.users[0]?.nickname?.slice(0, 1)?.toUpperCase()
                            }
                        </Avatar>
                        <span className="name">
                            {
                                roomDetail && roomDetail.type ?
                                roomDetail.name : roomDetail?.users[0]?.nickname
                            }
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