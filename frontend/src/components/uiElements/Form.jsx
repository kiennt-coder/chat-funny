import FormWrapper from "./styled/Form"


const Form = ({children, ...props}) => {
    return (
        <>
            <FormWrapper {...props}>
                {children}
            </FormWrapper>
        </>
    )
}

export default Form