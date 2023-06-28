import { Link } from "react-router-dom"
import LogoWrapper from "./styled"
import LogoLight from "../../../assets/images/logo-light.svg"
import setting from "../../../configs/setting"
import { memo, useCallback } from "react"
import { Tooltip } from "../../../components/uiElements"

const Logo = ({onChangeMenuItem=function(){}, ...props}) => {
    
    const handleClickLogo = useCallback((e) => {
        onChangeMenuItem()
    }, [onChangeMenuItem])

    return (
        <LogoWrapper {...props}>
            <Tooltip title={`Logo ${setting.APP_NAME}`}>
                <Link to="/" onClick={handleClickLogo}>
                    <img src={LogoLight} alt={`Logo ${setting.APP_NAME}`} />
                </Link>
            </Tooltip>
        </LogoWrapper>
    )
}

export default memo(Logo)