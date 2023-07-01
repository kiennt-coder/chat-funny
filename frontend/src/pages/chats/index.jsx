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
        return list.map(item => (
            <ChatItem to="123" />
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
                {/* <ChatItem to="123" />
                <ChatItem to="456" />
                <ChatItem to="789" />
                <ChatItem to="111" />
                <ChatItem to="112" />
                <ChatItem to="113" />
                <ChatItem to="114" />
                <ChatItem to="115" />
                <ChatItem to="116" />
                <ChatItem to="117" />
                <ChatItem to="118" /> */}
            </ChatBox>
        </PageWrapper>
    )
}

export default Chats