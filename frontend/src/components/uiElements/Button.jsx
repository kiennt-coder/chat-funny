import { forwardRef } from "react"
import ButtonWrapper from "./styled/Button"


const Button = forwardRef((props, ref) => {
    return (
        <>
            <ButtonWrapper {...props} ref={ref} />
        </>
    )
})

export default Button