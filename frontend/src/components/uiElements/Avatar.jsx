import { forwardRef } from "react"
import AvatarWrapper from "./styled/Avatar"


const Avatar = forwardRef(({...props}, ref) => {
    return (
        <>
            <AvatarWrapper {...props} ref={ref} />
        </>
    )
})

export default Avatar