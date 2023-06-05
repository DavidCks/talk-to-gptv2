import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs } from 'antd';

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
                style={{ height: 220 }}
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
    return <div>Audio Output Settings</div>
}

const AudioInputSettings: React.FC = () => {
    return <div>Audio Input Settings</div>
}

export default Settings;