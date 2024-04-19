import React from "react";

interface InfoModalProps {
    isVisible: boolean;
    content: string;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isVisible, content, onClose }) => {
    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            backgroundColor: 'white', padding: '20px', zIndex: 100, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
            <h2>Node Information</h2>
            <div>{content}</div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default InfoModal;