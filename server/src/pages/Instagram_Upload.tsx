import React, { useState } from 'react';
import ProfileSection from '../components/instgram/ProfileSection';
import MessageSection from '../components/instgram/MessageSection';

const InstagramUpload: React.FC = () => {
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');
    const [isToggled, setIsToggled] = useState(false);

    const handleChange1 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage1(event.target.value);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage2(event.target.value);
    };

    const handleGenerateMessage = () => {
        setMessage2(message1);
    };

    const handleToggleChange = (toggled: boolean) => {
        setIsToggled(toggled);
        if (!toggled) {
            setMessage2('');
        }
    };

    return (
        <main className="flex items-center justify-center h-screen gap-5">
            <ProfileSection />
            <MessageSection
                message1={message1}
                message2={message2}
                isToggled={isToggled}
                onChangeMessage1={handleChange1}
                onChangeMessage2={handleChange2}
                onToggleChange={handleToggleChange}
                onGenerateMessage={handleGenerateMessage}
            />
        </main>
    );
};

export default InstagramUpload;
