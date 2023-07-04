import { Dropdown } from "../uiElements"

const MenuContext = ({children, ...props}) => {
    
    return (
        <Dropdown trigger={["hover"]} arrow {...props}>
            {children}
        </Dropdown>
    )
}

export default MenuContext