import React from 'react';
import { InputControls } from './controls/input_controls';
import { UiToggle } from './controls/ui_toggle';
import { DialogueToggle } from './controls/dialogue_toggle';
import { SettingsModal } from './controls/settings_modal';
import { init as playButtonInit } from './dynamic/play_button/play_button_config';

export const InjectablesContainer = () => {
    playButtonInit()
    return <>
        <InputControls />
        <DialogueToggle />
        <SettingsModal />
        <UiToggle />
    </>
}