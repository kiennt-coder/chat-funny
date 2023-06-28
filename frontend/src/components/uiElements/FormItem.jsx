import FormItemWrapper from "./styled/FormItem"


const FormItem = ({children, ...props}) => {
    return (
        <>
            <FormItemWrapper {...props}>
                {children}
            </FormItemWrapper>
        </>
    )
}

export default FormItem