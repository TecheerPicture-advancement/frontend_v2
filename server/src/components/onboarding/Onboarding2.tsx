import Arrow from '../../assets/arrow.svg?react'

const Onboarding2: React.FC = () => {
    return(
        <div className='flex flex-col gap-8'>
        <div className="flex justify-start items-center w-[1535px] ml-auto gap-5 overflow-x-auto scrollbar-hidden">
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[580px] relative">
            <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-10">
                <img src="/assets/onboarding/Nukki.jpg" className="w-[581px] h-[526px] object-cover text-2xl font-PR_BO text-left text-black dark:text-white"/>
                <div className="flex flex-col gap-3">
                    <p className="flex-grow-0 flex-shrink-0 text-2xl font-PR_BO text-left text-black  dark:text-white">
                        배경 제거
                    </p>
                    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[580px] text-base font-PR_M text-left text-gray-300 dark:text-green-Light">
                        이제 복잡한 편집 없이, 원하는 이미지에서 배경을 간편하게 제거해보세요. 불필요한 배경을 쉽게 제거하여, 중요한 부분만 남기고 깔끔한 이미지로 변환할 수 있습니다. 나만의 스타일로 사진을 더욱 돋보이게 만들 수 있습니다.
                    </p>
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[581px] relative gap-10">
        <img src="/assets/onboarding/Simple.jpg" className="w-[581px] h-[526px] object-cover text-2xl font-PR_BO text-left text-black dark:text-white"/>
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3">
            <p className="flex-grow-0 flex-shrink-0 text-2xl font-PR_BO text-left  text-black dark:text-white">
                심플한 배경 추가
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[581px] text-base font-PR_M text-left text-gray-300 dark:text-green-Light">
                <span className="self-stretch flex-grow-0 flex-shrink-0 w-[581px] text-base font-PR_M text-left text-gray-300 dark:text-green-Light">
                사진을 더 세련되게 만들어주는 심플한 배경을 추가해보세요.
                간단하고 깨끗한 배경으로 이미지의 주제를 강조하고, 보다 전문적이고
                깔끔한 느낌을 줄 수 있습니다. 불필요한 요소를 배제하고, 이미지의 집중도를 높여보세요.
                </span>
            </p>
            </div>
        </div>
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[586px] relative gap-10">
            <img src="/assets/onboarding/Theme.jpg" className="w-[581px] h-[526px] object-cover text-2xl font-PR_BO text-left text-black dark:text-white"/>
            <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3">
            <p className="flex-grow-0 flex-shrink-0 text-2xl font-PR_BO text-left text-black dark:text-white">
                원하는 컨셉에 맞는 배경 삽입
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[586px] text-base font-PR_M text-left text-gray-300 dark:text-green-Light">
                다양한 배경 옵션 중에서 원하는 스타일을 선택하고, 사진에 맞는 분위기를 완성해보세요. 개성 있는 배경을 통해 사진의 메시지를 더 효과적으로 전달하고, 더욱 매력적인 비주얼을 만들어보세요. 상상하는 모든 스타일을 현실로!
            </p>
            </div>
        </div>
    </div>
    <div className='flex relative w-[1180px] mx-auto justify-end gap-4 '>
        <div className='relative flex items-center px-5 bg-gray-300 rounded-full transform rotate-180 cursor-pointer'>
            <Arrow width="10px" />
        </div>
        <div className='relative flex items-center px-5 bg-gray-300 rounded-full cursor-pointer'>
            <Arrow width="10px" />
        </div>
    </div>
    </div>
    );
};

export default Onboarding2;