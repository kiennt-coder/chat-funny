import PageWrapper from "../../components/PageWrapper"
import { PageFilter } from "../../components/PageWrapper/styled"
import { Input } from "../../components/uiElements"
import { SearchOutlined } from "@ant-design/icons"
import ChatBox from "./components/ChatBox"
import ChatItem from "./components/ChatItem"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getList, updateActiveRoom } from "../../services/store/room/slice"
import { Outlet } from "react-router-dom"

const Chats = () => {
    const dispatch = useDispatch()
    const {rooms, activeRoom} = useSelector(state => state.room)

    const handleChangeActiveRoom = (roomId) => {
        activeRoom !== roomId && dispatch(updateActiveRoom({activeRoom: roomId}))
    }

    const renderRooms = (list=[]) => {
        return list.map((item, index) => (
            <ChatItem key={index} to={item._id} room={item} onClick={() => handleChangeActiveRoom(item._id)} />
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
                <Outlet />
            </ChatBox>
        </PageWrapper>
    )
}

export default Chats