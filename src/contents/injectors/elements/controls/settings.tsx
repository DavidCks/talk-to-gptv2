import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs, Col, InputNumber, Row, Slider, Space, Divider } from 'antd';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const Settings: React.FC = () => {
    const [mode, setMode] = useState<TabPosition>('top');

    const handleModeChange = (e: RadioChangeEvent) => {
        setMode(e.target.value);
    };

    const SettingsItems = [
        {
            title: <p>Audio Output</p>,
            component: AudioOutputSettings,
        },
        {
            title: <p>Audio Input</p>,
            component: AudioInputSettings,
        }
    ]

    return (
        <div id="controls-input_controls-settings_modal-settings">
            <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                <Radio.Button value="top">Horizontal</Radio.Button>
                <Radio.Button value="left">Vertical</Radio.Button>
            </Radio.Group>
            <Tabs
                defaultActiveKey="1"
                tabPosition={mode}
                style={{ height: "auto" }}
                items={SettingsItems.map((e, i) => {
                    const id = String(i);
                    return {
                        label: e.title,
                        key: id,
                        children: <e.component />,
                    };
                })}
            />
        </div>
    );
};

const AudioOutputSettings: React.FC = () => {


    return (<>
        <SliderInput min={0} max={200} label="Volume" id="settings-volume" />
        <SliderInput min={0} max={200} label="Talking Speed" id="settings-rate" />
        <SliderInput min={0} max={200} label="Pitch" id="settings-pitch" />
        <Divider></Divider>
    </>
    );
}

const AudioInputSettings: React.FC = () => {
    return <div>Audio Input Settings</div>
}

const SliderInput = ({ min, max, label, id }: { min: number, max: number, label: string, id: string }) => {
    const [inputValue, setInputValue] = useState(((min + max) / 2) | 0);

    const onChange = (newValue: number) => {
        setInputValue(newValue);
    };

    return <>
        <label htmlFor={id}>{label}</label>
        <Row id={id}>
            <Col span={12}>
                <Slider
                    min={min}
                    max={max}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    prefix="%"
                    min={min}
                    max={max}
                    style={{ margin: '0 16px' }}
                    value={inputValue}
                    onChange={onChange}
                />
            </Col>
        </Row>
    </>
}

export default Settings;