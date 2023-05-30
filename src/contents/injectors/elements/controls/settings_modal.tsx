import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { getGlobalClassName } from '~contents/utils/styler';
import { classList } from '~contents/utils/classList_cloner';
import { FiSettings } from "react-icons/fi";
import { styles } from '~contents/utils/computedStyles_cloner';

const globalClassName: string = getGlobalClassName()

function getInitialColor() {
    if (styles().get("textarea")) {
        return styles().get("textarea").get("color").toString()
    } else {
        return "black"
    }
}

export const SettingsModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={globalClassName}>
            <Button type="text" className={classList()} style={{ height: "100%", padding: "5px 15px 5px 15px", display: "flex", justifyContent: "center" }} onClick={showModal}>
                <FiSettings color={getInitialColor()}></FiSettings>
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
};