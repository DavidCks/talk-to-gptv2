import { Switch } from "antd"
import cssText from "data-text:./dialogue_toggle.css"
import React, { useState } from "react"

import { ids } from "~contents/injectors/ids"
import { classList } from "~contents/utils/classList_cloner"

import { getGlobalClassName, injectStyle } from "../../../utils/styler"

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

  return (
    <div className={classList() + globalClassName + " dialogue-field"}>
      <label id="dialogueLabel">
        <Switch
          id={ids.dialogue_toggle}
          className={globalClassName}
          onChange={handleChange}
          checked={isChecked}
        />
        <span className={globalClassName} id="dialogueLabelText">
          Dialogue
        </span>
      </label>
    </div>
  )
}
