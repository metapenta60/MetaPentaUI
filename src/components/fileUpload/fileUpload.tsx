import React, { useState } from 'react';

interface FileUploadProps {
    setTriggerUpdate: (update: boolean) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setTriggerUpdate }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        console.log('Uploading file...');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8080/upload', { // Adjust the URL to your backend endpoint
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const data = await response.json();
            console.log(data);

            // Optionally set triggerUpdate to true to reload data
            setTriggerUpdate(true);

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Upload and Process</button>
    </div>
);
};

export default FileUpload;
