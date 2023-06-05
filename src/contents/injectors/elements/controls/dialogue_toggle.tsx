import React, { useState } from "react"
import { classList } from "~contents/utils/classList_cloner"
import { Switch } from "antd"
import { getGlobalClassName, injectStyle } from '../../../utils/styler';
import cssText from "data-text:~contents/injectors/elements/controls/dialogue_toggle.css"
injectStyle(cssText)

export const DialogueToggle = () => {
    const [isChecked, setIsChecked] = useState(false)
    const globalClassName: string = getGlobalClassName()

    const handleChange = () => {
        if (isChecked) {
        } else {
        }
        setIsChecked(!isChecked)
    }

    return <div className={classList() + globalClassName + " dialogue-field"}>
        <label id="dialogueLabel">
            <Switch id="controls-dialogue_toggle" className={globalClassName} onChange={handleChange} checked={isChecked} />
            <span className={globalClassName} id="dialogueLabelText">Dialogue</span>
        </label>
    </div>
}