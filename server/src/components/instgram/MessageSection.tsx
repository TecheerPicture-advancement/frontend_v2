import React from 'react';
import MessageInput from './MessageInput'
import ToggleControl from './ToggleControl';
import GenerateButton from './GenerateButton';
import MainButton from '../MainButton';

interface MessageSectionProps {
    message1: string;
    message2: string;
    isToggled: boolean;
    onChangeMessage1: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeMessage2: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onToggleChange: (toggled: boolean) => void;
    onGenerateMessage: () => void;
}

const MessageSection: React.FC<MessageSectionProps> = ({
    message1,
    message2,
    isToggled,
    onChangeMessage1,
    onChangeMessage2,
    onToggleChange,
    onGenerateMessage,
}) => (
    <section className="gap-5 flex flex-col p-7 bg-white w-[568px] h-[540px]">
        <div className="flex flex-col gap-5 h-full items-center">
            <ToggleControl isToggled={isToggled} onToggleChange={onToggleChange} />
            <section className="gap-5 flex flex-col w-full">
                {isToggled ? (
                    <div className="relative flex flex-col gap-5">
                        <MessageInput
                            value={message1}
                            placeholder={`인스타그램 피드에 적을 캡션을 적어주세요
ex) 새로운 시작에 대한 동기부여의 글을 써주고, 해시태그를 잘 써줘`}
                            onChange={onChangeMessage1}

                        />
                        <GenerateButton onClick={onGenerateMessage} />
                        <MessageInput
                            value={message2}
                            placeholder="생성된 메시지가 여기에 표시됩니다"
                            onChange={onChangeMessage2}

                        />
                    </div>
                ) : (
                    <MessageInput
                        value={message2}
                        placeholder="직접 메시지를 입력하세요"
                        onChange={onChangeMessage2}
                        heightClass="h-[340px]"
                    />
                )}
            </section>
            <div className="w-[430px] h-[60px] bg-green-Normal rounded-[10px]">
                <MainButton value="인스타그램에 생성하기" />
            </div>
        </div>
    </section>
);

export default MessageSection;
