import React from 'react';

interface MessageInputProps {
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, placeholder, onChange }) => (
    <textarea
        value={value}
        onChange={onChange}
        className="w-full h-40 p-4 rounded-lg resize-none focus:outline-none text-black font-PR_M text-base bg-gray-50 placeholder-gray-300 border-none"
        placeholder={placeholder}
    />
);

export default MessageInput;
