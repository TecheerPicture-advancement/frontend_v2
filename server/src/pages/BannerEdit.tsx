import React from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import NavBar from '../components/NavBar';
import RadioButton from '../components/RadioButton';
import RadioButton2 from '../components/RadioButton2';
import ResultButton from '../components/ResultButton';
import ResultImageBanner from '../components/ResultImageBanner';
import axios from 'axios';
import { useEffect } from 'react';

interface BannerResponse {
  code: number;
  message: string;
  data: {
    maintext: string;
    servetext: string;
    maintext2: string;
    servetext2: string;
  };
}

const BannerEdit: React.FC = () => {

  const location = useLocation();
  const {backgroundids,MaintextArr, ServetextArr, banner_id, Photo, selectMaintext, selectServetext, index  } = location.state || {}; // BannerResult에서 전달된 state 구조 분해 할당

  const [mainText1, setMainText1] = React.useState('');
  const [mainText2, setMainText2] = React.useState('');
  const [subText1, setSubText1] = React.useState('');
  const [subText2, setSubText2] = React.useState('');

  const [selectedMainText, setSelectedMainText] = React.useState('');
  const [selectedSubText, setSelectedSubText] = React.useState('');

  const [checkedMajor, setCheckedMajor] = React.useState<string | null>(null);
  const [hoveredMajor, setHoveredMajor] = React.useState<string | null>(null);

  const [checkedMinor, setCheckedMinor] = React.useState<string | null>(null);
  const [hoveredMinor, setHoveredMinor] = React.useState<string | null>(null);

  const [editMainText3, setEditMainText3] = React.useState('');
  const [editSubText3, setEditSubText3] = React.useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBannerData = async () => {
      console.log(selectMaintext);
      console.log(selectServetext);
      try {
        const response = await axios.get<BannerResponse>(`/api/v1/banners/${banner_id}`);
        setMainText1(response.data.data.maintext);
        setMainText2(response.data.data.maintext2);
        setSubText1(response.data.data.servetext);
        setSubText2(response.data.data.servetext2);
        setSelectedMainText(selectMaintext); // Set default selected main text
        setSelectedSubText(selectServetext); // Set default selected sub text
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, [banner_id, selectMaintext, selectServetext]);


  const handleToggleMajor = (id: string) => {
    setCheckedMajor(prevChecked => (prevChecked === id ? null : id));
    if (id === 'option1') {
      setSelectedMainText(mainText1);
    } else if (id === 'option2') {
      setSelectedMainText(mainText2);
    } else if (id === 'option3') {
      setSelectedMainText(editMainText3);
    }
  };

  const handleMouseEnterMajor = (id: string) => {
    setHoveredMajor(id);
  };

  const handleMouseLeaveMajor = () => {
    setHoveredMajor(null);
  };

  const handleToggleMinor = (id: string) => {
    setCheckedMinor(prevChecked => (prevChecked === id ? null : id));
    if (id === 'option4') {
      setSelectedSubText(subText1);
    } else if (id === 'option5') {
      setSelectedSubText(subText2);
    } else if (id === 'option6') {
      setSelectedSubText(editSubText3);
    }
  };

  const handleMouseEnterMinor = (id: string) => {
    setHoveredMinor(id);
  };

  const handleMouseLeaveMinor = () => {
    setHoveredMinor(null);
  };

  const handleClose = () => {
    navigate(-1);
  };

  const goToBannerResult = () => {
    if (selectedMainText &&selectedSubText) {
      navigate('/banner/result', { state: { backgroundids:backgroundids,MaintextArr:MaintextArr,ServetextArr:ServetextArr,bannerId:banner_id, takeMaintext:selectedMainText, takeServetext:selectedSubText, Index:index } });
    }
  };

  const handleMajorTextChange = (value: string) => {
      setEditMainText3(value);
      setSelectedMainText(value);
  };

  const handleMinorTextChange = (value: string) => {
      setEditSubText3(value);
      setSelectedSubText(value);
  };

  return (
    <div className="flex flex-col min-h-screen gap-6 overflow-hidden bg-black">
      <NavBar />
      <div className="relative flex flex-col items-center justify-start flex-grow flex-shrink-0 w-full gap-1 px-12 py-2 overflow-hidden bg-black">
        <div className="flex-grow-0 flex-shrink-0 w-[60%] h-20 relative overflow-hidden">
          <p className="absolute left-0 text-xl text-left text-white font-PR_M top-12">자유롭게 변경하세요</p>
          <div className="absolute left-0 overflow-hidden ">
            <p className="text-3xl text-left font-PR_BL text-green-Normal">문구 편집</p>
          </div>
        </div>
        <div className="relative flex items-start justify-center flex-grow-0 flex-shrink-0 w-full h-full gap-32">
          <div className="relative flex-grow-0 flex-shrink-0 mt-8 mr-3 w-96 h-96">
            <div className="absolute top-0 left-0 bg-white w-96 h-96" />

            <ResultImageBanner
                src={Photo}
                isSelected={false}
                width={384}
                height={384}
                maintext={selectedMainText}
                servetext={selectedSubText}
              />

          </div>
          <div className="flex flex-col items-center justify-start flex-grow-0 flex-shrink-0 gap-8 p-1 h-80 w-80">
            <div className="flex flex-col items-start self-stretch justify-start flex-grow-0 flex-shrink-0 gap-0 overflow-hidden pt-7">
              <div className="relative flex flex-col items-start self-stretch justify-start flex-grow-0 flex-shrink-0 h-48 overflow-hidden w-76">
                <p className="flex-grow-0 flex-shrink-0 w-20 h-6 text-lg text-left font-PR_BL pb-7 text-green-Light">주요</p>
                <div className="relative flex flex-col items-start self-stretch justify-start flex-grow-0 flex-shrink-0 py-1 overflow-hidden">
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 mb-3">
                    <RadioButton
                      checked={checkedMajor === 'option1'}
                      hovered={hoveredMajor === 'option1'}
                      onToggle={() => handleToggleMajor('option1')}
                      onMouseEnter={() => handleMouseEnterMajor('option1')}
                      onResetHover={handleMouseLeaveMajor}
                      text={mainText1}
                    />
                  </div>
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 mb-3 overflow-hidden">
                    <RadioButton
                      checked={checkedMajor === 'option2'}
                      hovered={hoveredMajor === 'option2'}
                      onToggle={() => handleToggleMajor('option2')}
                      onMouseEnter={() => handleMouseEnterMajor('option2')}
                      onResetHover={handleMouseLeaveMajor}
                      text={mainText2}
                    />
                  </div>
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 overflow-hidden">
                    <RadioButton2
                      checked={checkedMajor === 'option3'}
                      hovered={hoveredMajor === 'option3'}
                      onToggle={() => handleToggleMajor('option3')}
                      onMouseEnter={() => handleMouseEnterMajor('option3')}
                      onResetHover={handleMouseLeaveMajor}
                      value={editMainText3}
                      onValueChange={handleMajorTextChange}
                    />
                  </div>
                </div>
               </div>
              <div className="relative flex flex-col items-start self-stretch justify-start flex-grow-0 flex-shrink-0 h-48 overflow-hidden">
                <p className="flex-grow-0 flex-shrink-0 w-16 h-6 text-lg text-left font-PR_M pb-7 text-green-Light">부가</p>
                <div className="relative flex flex-col items-start self-stretch justify-start flex-grow-0 flex-shrink-0 py-1 overflow-hidden">
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 mb-3 overflow-hidden">
                    <RadioButton
                      checked={checkedMinor === 'option4'}
                      hovered={hoveredMinor === 'option4'}
                      onToggle={() => handleToggleMinor('option4')}
                      onMouseEnter={() => handleMouseEnterMinor('option4')}
                      onResetHover={handleMouseLeaveMinor}
                      text={subText1}
                    />
                  </div>
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 mb-3 overflow-hidden">
                    <RadioButton
                      checked={checkedMinor === 'option5'}
                      hovered={hoveredMinor === 'option5'}
                      onToggle={() => handleToggleMinor('option5')}
                      onMouseEnter={() => handleMouseEnterMinor('option5')}
                      onResetHover={handleMouseLeaveMinor}
                      text={subText2}
                    />
                  </div>
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 overflow-hidden">
                    <RadioButton2
                      checked={checkedMinor === 'option6'}
                      hovered={hoveredMinor === 'option6'}
                      onToggle={() => handleToggleMinor('option6')}
                      onMouseEnter={() => handleMouseEnterMinor('option6')}
                      onResetHover={handleMouseLeaveMinor}
                      value={editSubText3}
                      onValueChange={handleMinorTextChange}
                    />
                  </div>
                </div>
                <div className="self-stretch flex-grow-0 flex-shrink-0 h-48 bg-[#111] border border-[#111]" style={{ boxShadow: '0px 4px 4px 0 rgba(0,0,0,0.25)' }} />
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-80 h-8 relative gap-0.5 px-1 py-0.5 rounded-md border border-[#e6fbed]">
                  <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-white">손에 착 감기는 완벽함 중국산의 새로운 기준</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-grow-0 flex-shrink-0 gap-4 px-4 py-2 mt-10 overflow-hidden">
          <div className="relative flex items-center justify-center flex-grow-0 flex-shrink-0 w-32 h-8 gap-1 px-1 rounded-lg"
          onClick={goToBannerResult}>
            <ResultButton value="확인" />
          </div>
          <div
            className="relative flex items-center justify-center flex-grow-0 flex-shrink-0 w-32 h-8 gap-1 px-1 rounded-lg"
            onClick={handleClose}
            style={{ cursor: 'pointer' }}
          >
            <ResultButton value="닫기" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerEdit;
