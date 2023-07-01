import PageWrapper from "../../components/PageWrapper"
import { PageFilter } from "../../components/PageWrapper/styled"
import { Input } from "../../components/uiElements"
import { SearchOutlined } from "@ant-design/icons"
import ChatBox from "./components/ChatBox"
import ChatItem from "./components/ChatItem"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getList } from "../../services/store/room/slice"

const Chats = () => {
    const dispatch = useDispatch()
    const {rooms} = useSelector(state => state.room)

    const renderRooms = (list=[]) => {
        return list.map((item, index) => (
            <ChatItem key={index} to={item._id} room={item} />
        ))
    }

    useEffect(() => {
        !rooms.length && dispatch(getList())
    }, [rooms, dispatch])

    return (
        <PageWrapper
            title="Tin nhắn"
        >
            <PageFilter>
                <Input placeholder="Tìm kiếm bạn bè" prefix={<SearchOutlined />} />
            </PageFilter>
            
            <ChatBox>
                {
                    renderRooms(rooms)
                }
            </ChatBox>
        </PageWrapper>
    )
}

export default Chats