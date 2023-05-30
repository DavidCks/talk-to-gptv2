import React, { useState } from "react"
import { getGlobalClassName, hideClass, showClass } from '../../../utils/styler';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export const UiToggle = () => {
    const [isChecked, setIsChecked] = useState(false)
    const globalClassName: string = getGlobalClassName()

    const handleChange = () => {
        if (isChecked) {
            showClass(globalClassName)
            showClass("ant-switch-handle")
            showClass("ant-switch-inner-checked")
            showClass("ant-switch-inner-unchecked")
        } else {
            hideClass(globalClassName)
            hideClass("ant-switch-handle")
            hideClass("ant-switch-inner-checked")
            hideClass("ant-switch-inner-unchecked")
        }
        setIsChecked(!isChecked)
    }

    return <label onClick={handleChange}>
        {!isChecked ?
            <AiOutlineEyeInvisible size="24px" style={{ position: "relative", float: "right", marginRight: "-31px", top: "calc(50% - 10px)", visibility: "visible" }}></AiOutlineEyeInvisible> :
            <AiOutlineEye size="24px" style={{ float: "right", marginRight: "-31px", marginTop: "-35px", visibility: "visible" }}></AiOutlineEye>
        }
    </label>
}