import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../api/Usercontext';
import ImageBox from '../components/ImageBox';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import ImageUploadModal from '../components/UploadImageModal1';
import MainButton from '../components/MainButton';

interface ThemeDetails {
  imageSource: string;
  detail: string;
  theme: string;
  sentence: string;
}

interface PostData {
  user_id: string;
  image_id: number;
  gen_type?: string;
  concept_option?: {
    category: string;
    theme: string;
    num_results: number;
  };
}

interface ResponseData {
  background_id: number;
}

const ThemeResult: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeDetails>({
    imageSource: '',
    theme: '',
    detail: '',
    sentence: '',
  });
  const [isThemeSelected, setIsThemeSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userid } = useUser();
  const navigate = useNavigate();

  const handleThemeSelect = (themeDetails: ThemeDetails) => {
    setSelectedTheme(themeDetails);
    setIsThemeSelected(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200); // Adjust this value to control the scroll speed
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleModalClose = async (uploadedImageId: number | null) => {
    setShowModal(false);

    if (uploadedImageId && userid) {
      const conceptPostData: PostData = {
        user_id: userid,
        image_id: uploadedImageId,
        gen_type: 'concept',
        concept_option: {
          category: 'others',
          theme: selectedTheme.theme,
          num_results: 1,
        },
      };

      const removeBgPostData: PostData = {
        user_id: userid,
        image_id: uploadedImageId,
        gen_type: 'remove_bg',
      };

      try {
        setIsLoading(true);

        const [conceptResponses, removeBgResponse] = await Promise.all([
          Promise.all(
            Array.from({ length: 2 }, () =>
              axios.post<ResponseData>('http://localhost:8000/api/v1/backgrounds/', conceptPostData, {
                headers: { 'Content-Type': 'application/json' },
              })
            )
          ),
          axios.post<ResponseData>('http://localhost:8000/api/v1/backgrounds/', removeBgPostData, {
            headers: { 'Content-Type': 'application/json' },
          }),
        ]);

        const conceptBackgroundIds = conceptResponses.map(response => response.data.background_id);
        const removeBgBackgroundId = removeBgResponse.data.background_id;

        setIsLoading(false);
        alert('데이터를 성공적으로 전송했습니다.');

        navigate(`/theme/result`, {
          state: {
            conceptBackgroundIds,
            removeBgBackgroundId,
            imageId: uploadedImageId,
          },
        });
      } catch (error: any) {
        console.error('Error submitting data:', error.response ? error.response.data : error.message);
        alert('데이터를 전송하지 못했습니다.');
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading ? (
                <Loading />
              ) : (
    <div className="bg-black overflow-hidden">
      <div className="flex-shrink-0 flex-grow-0">
        <NavBar />
      </div>
      <div className="w-full max-w-screen-2xl h-full flex flex-col items-center justify-start gap-10 md:gap-20 lg:gap-[90px] overflow-hidden">
        <header className="h-30 mb-10 md:h-52 lg:h-[200px] flex flex-col items-center justify-start gap-2.5 md:gap-3 lg:gap-[10px] pt-6 md:pt-8 lg:pt-[23px] pr-6 md:pr-8 lg:pr-[119px] pl-6 md:pl-8 lg:pl-[120px] overflow-hidden">
          <h1 className="text-3xl md:text-2xl lg:text-[40px] leading-tight font-PR_BL text-center text-[#fff]">
            내 마음대로 만드는<br />
            <span className="text-green-Normal">상품 이미지</span>
          </h1>
          <span className="text-center text-white font-PR_L">원하는 상품 이미지를 클릭해주세요</span>
        </header>
        <AnimatePresence>
          {isThemeSelected && (
            <motion.div
              key={selectedTheme.theme}
              layoutId={selectedTheme.theme}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
                <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-[35px] px-2.5 h-full">
                  <div className="flex-grow-0 flex-shrink-0 w-[250px] h-[250px] relative overflow-hidden rounded-[30px]">
                    <div
                      className="w-[250px] h-[250px] absolute left-0 top-[-0.5px] bg-[#e6ffef] rounded-[30px]"
                      style={{
                        boxShadow:
                          '10.5px 123.5px 34.5px 0 rgba(255,255,255,0), 6.5px 79px 31.5px 0 rgba(255,255,255,0.01), 4px 44.5px 27px 0 rgba(255,255,255,0.05), 1.5px 19.5px 20px 0 rgba(255,255,255,0.09), 0.5px 5px 11px 0 rgba(255,255,255,0.1)',
                      }}
                    />
                    <img
                      src={selectedTheme.imageSource}
                      className="w-[250px] h-[250px] absolute left-[0px] top-[0px] object-cover rounded-[30px]"
                    />
                    <div className="w-[250px] h-[250px] absolute left-0 top-[0px] opacity-50 bg-gradient-to-b from-white to-black mix-blend-multiply" />
                  </div>
                  <div className="relative flex flex-col items-start justify-between flex-grow-0 flex-shrink-0 gap-20">
                    <div className="flex-grow-0 flex-shrink-0 w-[191.5px] h-[121px] relative overflow-hidden"></div>
                    <p className="w-[191.5px] h-[36px] absolute left-[-0.25px] top-[75px] text-sm font-PR_M text-left text-white">
                      {selectedTheme.sentence}
                    </p>
                    <div className="w-full h-[50px] absolute left-0 top-0 overflow-hidden">
                      <p className="w-full h-[45px] absolute left-0 top-[19.5px] text-2xl font-PR_BO text-left text-[#e6fbed]">
                        {selectedTheme.theme}
                      </p>
                      <p className="w-full absolute left-0 top-0 text-sm font-PR_M text-left text-[#d9d9d9]">
                        {selectedTheme.detail}
                      </p>
                    </div>
                    <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[240px] h-[32px] relative rounded-xl">
                      <div onClick={openModal} className="w-[430px] h-[44px] rounded-lg">
                        <MainButton value="생성하러 가기" />
                      </div>
                    </div>
                    
                  </div>
                </div>
            </motion.div>
          )}{showModal && 
            <ImageUploadModal onClose={handleModalClose} />
          }
        </AnimatePresence>
        <main className="flex flex-row items-center justify-center w-full h-full gap-5 z-0">
          <div className="relative w-[200px] max-w-4xl h-[900px] shrink-0 flex items-center justify-center">
            {selectedTheme.theme !== 'AI' && (
              <ImageBoxPosition
                className="bottom-[75%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/AI.png"
                detail="적합한 이미지 추천"
                theme="AI"
                sentence="AI가 사진을 분석 후 최적의 사진을 제공해드립니다."
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '봄' && (
              <ImageBoxPosition
                className="bottom-[50%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/spring.png"
                detail="흩날리는"
                theme="봄"
                sentence="따뜻한 봄날에 어울리는 이미지를 생성해드립니다."
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '스튜디오' && (
              <ImageBoxPosition
                className="bottom-[25%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/studio.png"
                detail="감성적인 디자인"
                theme="스튜디오"
                sentence="스튜디오에서 찍은 것처럼 이미지를 생성해드립니다."
                onClick={handleThemeSelect}
              />
            )}
          </div>
          <div className="relative w-[200px] max-w-4xl h-[900px] shrink-0 flex items-center justify-center">
            {selectedTheme.theme !== '명소' && (
              <ImageBoxPosition
                className="bottom-[62.5%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/place.png"
                detail="아름답고 현실적인"
                theme="명소"
                sentence="유명한 명소를 배경으로 이미지를 생성해드립니다."
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '여름' && (
              <ImageBoxPosition
                className="bottom-[37.5%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/summer.png"
                detail="시원한 바닷가"
                theme="여름"
                sentence="여름철 시원한 배경으로 이미지를 생성해드립니다."
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '오피스' && (
              <ImageBoxPosition
                className="bottom-[12.5%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/office.png"
                detail="정돈된 환경"
                theme="오피스"
                sentence="깔끔하게 정돈된 배경으로 이미지를 생성해드립니다."
                onClick={handleThemeSelect}
              />
            )}
          </div>
          <div className="relative w-[200px] max-w-4xl h-[900px] shrink-0 flex items-center justify-center">
            {selectedTheme.theme !== '자연' && (
              <ImageBoxPosition
                className="bottom-[75%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/natural.png"
                detail="편안하고 포근한"
                theme="자연"
                sentence="편안한 자연을 배경으로 이미지를 생성해드립니다."
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '가을' && (
              <ImageBoxPosition
                className="bottom-[50%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/fall.png"
                detail="낭만적인 단풍잎"
                theme="가을"
                sentence="가을의 단풍잎이 어울리는 이미지를 생성해드립니다."
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '카페' && (
              <ImageBoxPosition
                className="bottom-[25%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/cafe.png"
                detail="모던한 디자인"
                theme="카페"
                sentence="카페처럼 모던한 디자인의 이미지를 생성해드립니다."
                onClick={handleThemeSelect}
              />
            )}
          </div>
          <div className="relative w-[200px] max-w-4xl h-[900px] shrink-0 flex items-center justify-center">
            {selectedTheme.theme !== '도시' && (
              <ImageBoxPosition
                className="bottom-[62.5%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/city.png"
                detail="차갑고 세련된"
                theme="도시"
                sentence="세련된 도시를 배경으로 이미지를 생성해드립니다."
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '겨울' && (
              <ImageBoxPosition
                className="bottom-[37.5%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/winter.png"
                detail="얼어붙은 나무들"
                theme="겨울"
                sentence="겨울철 차가운 느낌의 배경으로 이미지를 생성해드립니다."
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '직접입력' && (
              <ImageBoxPosition
                className="bottom-[12.5%] lg:w-[280px] lg:h-[280px] font-PR_M"
                imageSource="ThemeImage/pen.png"
                detail="내가 원하는 테마가 없다면?"
                theme="직접입력"
                sentence=""
                onClick={handleThemeSelect}
              />
            )}
          </div>
        </main>
      </div>
    </div>
    )}
    </>
  );
};

interface ImageBoxPositionProps {
  className: string;
  imageSource: string;
  detail: string;
  theme: string;
  sentence: string;
  onClick: (themeDetails: ThemeDetails) => void;
}

const ImageBoxPosition: React.FC<ImageBoxPositionProps> = ({ className, imageSource, detail, theme, sentence, onClick }) => {
  return (
    <motion.div
      className={`absolute ${className} w-50 h-50 md:w-50 md:h-50 cursor-pointer`}
      onClick={() => onClick({ imageSource, detail, theme, sentence })}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      layoutId={theme}
    >
      <ImageBox imageSource={imageSource} detail={detail} theme={theme} />
    </motion.div>
  );
};

export default ThemeResult;
