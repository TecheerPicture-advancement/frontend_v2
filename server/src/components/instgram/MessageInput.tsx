import React from 'react';

interface MessageInputProps {
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    heightClass?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
    value,
    placeholder,
    onChange,
    heightClass = "h-[160px]",
}) => (
    <textarea
        value={value}
        onChange={onChange}
        className={`w-full p-4 rounded-lg resize-none focus:outline-none text-black font-PR_M text-sm bg-gray-50 placeholder-gray-300 border-none ${heightClass}`}
        placeholder={placeholder}
    />
);

export default MessageInput;
