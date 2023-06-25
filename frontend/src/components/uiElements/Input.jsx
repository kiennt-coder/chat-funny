import { forwardRef } from "react"
import InputWrapper, {InputSearchWrapper, PasswordWrapper} from "./styled/Input"


const Input = forwardRef((props, ref) => {
    return (
        <>
            <InputWrapper {...props} ref={ref} />
        </>
    )
})

export const Password = (props) => {
    return (
        <>
            <PasswordWrapper {...props} />
        </>
    )
}

export const Search = (props) => {
    return (
        <>
            <InputSearchWrapper {...props} />
        </>
    )
}

export default Input