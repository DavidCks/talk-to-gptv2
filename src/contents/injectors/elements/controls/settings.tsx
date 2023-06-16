import type { RadioChangeEvent } from "antd"
import {
  Col,
  Divider,
  InputNumber,
  Radio,
  Row,
  Slider,
  Space,
  Tabs
} from "antd"
import React, { useState } from "react"

import { ids } from "~contents/injectors/ids"

import { getSpeechSettings } from "../../../utils/settings"

type TabPosition = "left" | "right" | "top" | "bottom"

const Settings: React.FC = () => {
  const [mode, setMode] = useState<TabPosition>("top")

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value)
  }

  const SettingsItems = [
    {
      title: <p>Audio Output</p>,
      component: AudioOutputSettings
    },
    {
      title: <p>Audio Input</p>,
      component: AudioInputSettings
    }
  ]

  return (
    <div id="controls-input_controls-settings_modal-settings">
      <Radio.Group
        onChange={handleModeChange}
        value={mode}
        style={{ marginBottom: 8 }}>
        <Radio.Button value="top">Horizontal</Radio.Button>
        <Radio.Button value="left">Vertical</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        style={{ height: "auto" }}
        items={SettingsItems.map((e, i) => {
          const id = String(i)
          return {
            label: e.title,
            key: id,
            children: <e.component />
          }
        })}
      />
    </div>
  )
}

const AudioOutputSettings: React.FC = () => {
  const settings = getSpeechSettings()
  return (
    <>
      <SliderInput
        min={0}
        max={200}
        value={settings.volume * 100}
        label="Volume"
        id={ids.settings_volume}
      />
      <SliderInput
        min={0}
        max={200}
        value={settings.rate * 100}
        label="Talking Speed"
        id={ids.settings_rate}
      />
      <SliderInput
        min={0}
        max={200}
        value={settings.pitch * 100}
        label="Pitch"
        id={ids.settings_pitch}
      />
      <Divider></Divider>
    </>
  )
}

const AudioInputSettings: React.FC = () => {
  return <div>Audio Input Settings</div>
}

const SliderInput = ({
  min,
  max,
  value,
  label,
  id
}: {
  min: number
  max: number
  value: number
  label: string
  id: string
}) => {
  const [inputValue, setInputValue] = useState(value)

  const onChange = (newValue: number) => {
    setInputValue(newValue)
    localStorage.setItem(id, newValue.toString())
  }

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Row id={id}>
        <Col span={12}>
          <Slider
            min={min}
            max={max}
            onChange={onChange}
            value={typeof inputValue === "number" ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            prefix="%"
            min={min}
            max={max}
            style={{ margin: "0 16px" }}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    </>
  )
}

export default Settings
