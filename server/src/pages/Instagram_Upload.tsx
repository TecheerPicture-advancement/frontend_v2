import React, { useState } from 'react';
import MainButton from '../components/MainButton';
import ArrowRight from '../assets/arrow_right.svg?react';

const InstagramUpload: React.FC = () => {
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');

    const handleChange1 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage1(event.target.value);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage2(event.target.value);
    };

    const handleGenerateMessage = () => {
        setMessage2(message1);
    };

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-1 w-[1128px] overflow-hidden gap-5">
                {/* image and profile */}
                <div className="flex flex-col justify-start items-start h-[540px] w-[540px] relative">
                    <div className="flex justify-start items-center absolute gap-2.5 pl-[30px] pr-10 py-[30px] z-10">
                        <img
                            className="w-12 h-12 rounded-full object-cover"
                            src="../../public/assets/logo.png"
                            alt="profile"
                        />
                        <span className="text-lg font-bold text-white">TecheerPicture</span>
                    </div>
                    <div className="absolute inset-0">
                        <div className="absolute w-full h-full mix-blend-multiply" style={{ background: "linear-gradient(179.88deg, #111 0.23%, #fff 42.79%)" }} />
                        <img
                            src="../../public/assets/Beauty3.jpg"
                            className="object-cover w-full h-full"
                            alt="background"
                        />
                    </div>
                </div>

                {/* Message */}
                <div className="gap-10 flex flex-col p-7 items-center bg-white">
                    <div className="gap-6 flex flex-col w-full">
                        <div className="relative">
                            <textarea
                                id="message1"
                                name="message1"
                                value={message1}
                                onChange={handleChange1}
                                className="w-full h-44 p-4 rounded-lg resize-none focus:outline-none text-black font-PR_M bg-gray-50 placeholder-gray-300 border-none"
                                placeholder={`인스타그램 피드에 적을 캡션을 적어주세요
ex) 새로운 시작에 대한 동기부여의 글을 써주고, 해시태그를 잘 써줘`}/>
                            <div className="absolute right-4 top-2/3  cursor-pointer flex items-center gap-2 rounded-full bg-white p-3">
                                <ArrowRight onClick={handleGenerateMessage} />
                            </div>
                        </div>

                        <div>
                            <textarea
                                id="message2"
                                name="message2"
                                value={message2}
                                onChange={handleChange2}
                                className="w-full h-44 p-4 rounded-lg resize-none focus:outline-none text-black font-PR_M bg-gray-50 placeholder-gray-300 border-none"
                                placeholder="ex) 작은 변화가 큰 차이를 만듭니다. 매일 조금씩 나아지는 나를 발견하는 순간, 삶은 더욱 풍요로워져요. 오늘도 새로운 도전과 기회를 맞이하는 자신을 응원합니다. 실패와 어려움은 성공을 위한 밑거름이니까, 두려워하지 말고 한 걸음 더 나아가세요. 여러분의 작은 노력이 쌓여 멋진 결과로 돌아올 거예요. 오늘부터 시작하는 새로운 여정, 여러분도 할 수 있습니다! 💪 #자기계발 #도전 #성공적인하루"
                            />
                        </div>
                    </div>

                    <div className="w-[430px] h-[60px] bg-green-Normal rounded-[10px]">
                        <MainButton value="인스타그램에 생성하기" onClick={handleGenerateMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstagramUpload;
