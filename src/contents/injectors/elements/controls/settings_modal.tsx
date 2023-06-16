import { Button, Modal } from "antd"
import React, { useState } from "react"
import { FiSettings } from "react-icons/fi"

import { ids } from "~contents/injectors/ids"
import { classList } from "~contents/utils/classList_cloner"
import { styles } from "~contents/utils/computedStyles_cloner"
import { getGlobalClassName } from "~contents/utils/styler"

import Settings from "./settings"

const globalClassName: string = getGlobalClassName()

function getInitialColor() {
  if (styles().get("textarea")) {
    return styles().get("textarea").get("color").toString()
  } else {
    return "black"
  }
}

export const SettingsModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const initSettigns = () => {
    localStorage.setItem(ids.settings_pitch, "1")
    localStorage.setItem(ids.settings_rate, "1")
    localStorage.setItem(ids.settings_volume, "1")
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={globalClassName}>
      <Button
        type="text"
        className={classList()}
        style={{
          height: "100%",
          padding: "5px 15px 5px 15px",
          display: "flex",
          justifyContent: "center"
        }}
        onClick={showModal}>
        <FiSettings color={getInitialColor()}></FiSettings>
      </Button>
      <Modal
        okType="text"
        title="Settings"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Settings></Settings>
      </Modal>
    </div>
  )
}
