import React, { useState } from 'react';
import ProfileSection from '../components/instgram/ProfileSection';
import MessageSection from '../components/instgram/MessageSection';
import { getAuthData } from "../utils/instaAuth";

const InstagramUpload: React.FC = () => {
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');
    const [isToggled, setIsToggled] = useState(false);

    const authData = getAuthData();

    if (!authData) {
    alert("❌ 로그인 정보 없음. 다시 로그인하세요!");
    window.location.href = "/";
    } else {
    console.log("🔑 저장된 Access Token:", authData.accessToken);
    console.log("👤 저장된 User ID:", authData.userId);
    }

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
        <main className="flex flex-col tablet:flex-row items-center justify-center h-screen gap-5">
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
