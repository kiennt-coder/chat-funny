import { Avatar } from "../uiElements"
import { MoreOutlined, ClockCircleOutlined, FileOutlined, DownloadOutlined, EllipsisOutlined } from "@ant-design/icons"
import ChatMessageWrapper, { ChatMessageAvatar, ChatMessageContent, ChatMessageFile, ChatMessageFileWrapper, ChatMessageImage, ChatMessageImageWrapper } from "./styled"
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

    const renderFiles = (files) => {
        return (
            <ChatMessageFileWrapper>
                {files.map(file => (
                    <ChatMessageFile>
                        <div className="file__icon">
                            <FileOutlined />
                        </div>
                        <div className="file__content">
                            <p className="file__name">{file?.name}</p>
                            <p className="file__size">
                                {file?.size ? (file.size / 1000000).toFixed(2) : "00.0"} MB
                            </p>
                        </div>
                        <div className="file__action">
                            <a rel="noopener" target="_blank" href={`${setting.API_DOWNLOAD_URL}${file?.url}`}>
                                <DownloadOutlined />
                            </a>
                            <EllipsisOutlined />
                        </div>
                    </ChatMessageFile>
                ))}
            </ChatMessageFileWrapper>
        )
    }

    const renderImages = (images) => {
        return (
            <ChatMessageImageWrapper>
                {images.map(image => (
                    <ChatMessageImage style={{backgroundImage: `url('${`${setting.API_DOWNLOAD_URL}${image?.url}`}')`}}>
                        <div className="image__action">
                            <a rel="noopener" target="_blank" href={`${setting.API_DOWNLOAD_URL}${image?.url}`}>
                                <DownloadOutlined />
                            </a>
                            <EllipsisOutlined />
                        </div>
                        <div className="image__overlay"></div>
                    </ChatMessageImage>
                ))}
            </ChatMessageImageWrapper>
        )
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
                            {message?.files?.length ? renderFiles(message.files) : ""}
                            {message?.images?.length ? renderImages(message.images) : ""}
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