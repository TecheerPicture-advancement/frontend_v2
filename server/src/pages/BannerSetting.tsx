import React, { useState } from 'react';
import axios from 'axios';
import ImageUploadModal from '../components/UploadImageModal1';
import NavBar from '../components/NavBar';
import { useUser } from '../api/Usercontext';
import InputField from '../components/form/InputField';
import SizeFields from '../components/form/SizeFields';
import AspectRatioButtons from '../components/form/AspectRatioButtons';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading'; 

interface FormData {
  item_name: string;
  item_concept: string;
  item_category: string;
  add_information: string;
  output_w: number;
  output_h: number;
}
interface BannerResponse {
  code: number;
  message: string;
  data: {
    id: number;
    maintext: string;
    servetext: string;
    maintext2: string;
    servetext2: string;
  };
}

interface BackgroundResponse {
  background_id: number;
}

const BannerSetting: React.FC = () => {
  const { userid } = useUser();
  const [formData, setFormData] = useState<FormData>({
    item_name: '',
    item_concept: '',
    item_category: '',
    add_information: '',
    output_w: 1000,
    output_h: 1000,
  });

  const [showModal, setShowModal] = useState(false);
  const [, setImageId] = useState<number | null>(null);
  const [isSizeFieldsDisabled, setIsSizeFieldsDisabled] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState<string>('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === '' ? '' : value });
  };

  const handleModalClose = async (uploadedImageId: number | null) => {
    setShowModal(false);
    if (uploadedImageId && userid) {
      setImageId(uploadedImageId);
      setLoading(true); // Show loading screen
      try {
        const bannerData = {
          image_id: uploadedImageId,
          user_id: userid,
          item_name: formData.item_name,
          item_concept: formData.item_concept,
          item_category: formData.item_category,
          add_information: formData.add_information,
        };
        const backgroundData = {
          user_id: userid,
          image_id: uploadedImageId,
          gen_type: 'concept',
          output_w: formData.output_w,
          output_h: formData.output_h,
          concept_option: {
            category: "others",
            theme: formData.item_concept,
            num_results: 1,
          },
        };
        console.log(uploadedImageId);

        // 네 번의 POST 요청을 병렬로 보냄
        const requests = [];
        const requests2 = [];
        for (let i = 0; i < 4; i++) {
          requests.push(
            axios.post<BackgroundResponse>('http://localhost:8000/api/v1/backgrounds/', backgroundData, {
              headers: { 'Content-Type': 'application/json' }
            })
          );
        }
        requests2.push(
          axios.post<BannerResponse>('http://localhost:8000/api/v1/banners/', bannerData, {
            headers: { 'Content-Type': 'application/json' }
          })
        );

        // 모든 요청을 병렬로 처리
        const responses2 = await Promise.all(requests2);//bannerid 처리
        const responses = await Promise.all(requests);//backgroundids 처리
        
        // 응답에서 background_ids 추출 (4개)
        const backgroundids = responses.map((res) => res.data.background_id);

        // banner 응답에서 id 추출
        const bannerId = responses2[0].data.data.id;
      
      
        // 로딩 후 결과 페이지로 이동
        setTimeout(() => {
          console.log("bannerid=",bannerId);
          console.log("backgroundids=",backgroundids);
          navigate('/banner/result', { state: {bannerId: bannerId, backgroundids: backgroundids }});
        }, 10000); // 10초 지연 설정
      } catch (error) {
        console.log('데이터를 전송하지 못했습니다.');
        alert('데이터를 전송하지 못했습니다.');
        setLoading(false); // Hide loading screen if there was an error
      }
    }
  };

  const handleAspectRatioClick = (width: number, height: number) => {
    const ratio = `${width}x${height}`;
    if (selectedRatio === ratio) {
      setSelectedRatio('');
      setIsSizeFieldsDisabled(false);
    } else {
      setSelectedRatio(ratio);
      setFormData((prevData) => ({
        ...prevData,
        output_w: width,
        output_h: height,
      }));
      setIsSizeFieldsDisabled(true);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: ''
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.item_name ||
      !formData.item_concept ||
      !formData.item_category ||
      !formData.output_w ||
      !formData.output_h
    ) {
      alert('필수 입력창에 입력하지 않았습니다.');
      return;
    }
    openModal();
  };

  const openModal = () => {
    setShowModal(true);
  };

  if (!userid) {
    console.error('userid is undefined');
    return (
      <div className='flex flex-col items-center justify-center min-h-screen gap-4 bg-black'>
        <div className='flex flex-col items-center text-3xl text-white font-PR_BO'>
          <span> \ \ \٩( ′ㅂ`)و ̑̑/ / / </span>
          <span>닉네̆̈임을 ગુ력하스Ι 않ヱ 왔군요̆̈</span>
          <span>닉네̆̈임을 ગુ력하ヱ 다̆̎⋌∣ 돌타와주⋌⫣요̆̈ </span>
        </div>
        <Link to="/nickname">
          <button className='p-4 text-lg text-black rounded-lg font-PR_M bg-green-Normal' type="button"> 닉네임 창으로 가기</button>
        </Link>
      </div>
    );
  }

  const buttons = [
    { label: '스토리 광고', width: 1080, height: 1920 },
    { label: '피드 광고', width: 1080, height: 1080 },
    { label: '네이티브 광고', width: 600, height: 600 },
    { label: '앱 광고', width: 1200, height: 628 },
    { label: '1:1 프로모션 광고', width: 800, height: 800 },
    { label: '1.91:1 프로모션', width: 800, height: 418 },
  ];


  return (
    <div className="bg-black">
      {loading ? ( // Show loading screen if loading is true
        <Loading />
      ) : (
        <>
          <NavBar />
          <div className='flex flex-col items-center justify-center'>
            <div className="relative flex items-center justify-center flex-grow-0 flex-shrink-0 bg-black my-14">
              <span className="flex items-center justify-center text-4xl text-center text-white font-PR_BO">
                내 마음대로 만드는
              </span>
              <span className="ml-2 text-4xl text-center font-PR_BO text-green-Normal">
                광고 이미지
              </span>
            </div>
            <form onSubmit={handleSubmit} className="w-auto max-w-5xl grid-cols-2 p-5 space-y-4 bg-black">
              <div className="flex flex-col justify-center gap-20">
                <div className='grid grid-cols-2 gap-24'>
                  <div className="flex flex-col flex-grow w-full">
                    <div className="flex flex-col mb-5">
                      <span className="px-3 text-2xl text-left font-PR_BO text-green-Normal">
                        광고 정보
                      </span>
                      <span className="px-3 text-base text-left font-PR_L text-green-Light">
                        내 마음대로 만드는 광고 상품 이미지
                      </span>
                    </div>
                    <div className="w-full font-PR_L text-green-Light">
                      <InputField
                        label="상품 이름"
                        essential={true}
                        name="item_name"
                        value={formData.item_name}
                        onChange={handleChange}
                        placeholder="예) 아이폰 15 프로"
                      />
                      <InputField
                        label="상품 컨셉"
                        name="item_concept"
                        essential={true}
                        value={formData.item_concept}
                        onChange={handleChange}
                        placeholder="예) 고급, 가벼움"
                      />
                      <InputField
                        label="상품 카테고리"
                        name="item_category"
                        essential={true}
                        value={formData.item_category}
                        onChange={handleChange}
                        placeholder="예) 전자기기"
                      />
                      <InputField
                        label="더 추가하고 싶은 내용이 있다면 적어주세요"
                        name="add_information"
                        essential={false}
                        value={formData.add_information}
                        onChange={handleChange}
                        placeholder="예) 유명인과 셀럽들만 사용한다는걸 어필해주세요"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow w-full md:w-1/3">
                    <div className='flex flex-col mb-7'>
                      <span className="text-2xl text-left font-PR_BO text-green-Normal">
                        광고 사이즈
                      </span>
                      <span className="text-base text-left font-PR_L text-green-Light">
                        광고 배경 사이즈를 입력해주세요
                      </span>
                    </div>
                    <SizeFields
                      width={formData.output_w}
                      height={formData.output_h}
                      onChange={handleChange}
                      essential={true}
                      isDisabled={isSizeFieldsDisabled}
                      onFocus={handleFocus}
                    />
                    <AspectRatioButtons buttons={buttons} selectedRatio={selectedRatio} onClick={handleAspectRatioClick} />
                  </div>
                </div>
                <div className="flex items-center justify-center" >
                  <button
                    type="submit"
                    className="flex items-center justify-center px-20 py-4 mt-4 text-lg text-black bg-green-Normal font-PR_BO rounded-xl"
                  >
                    이미지 올리기
                  </button>
                </div>
              </div>
            </form>
          </div>
          {showModal && (
            <ImageUploadModal onClose={handleModalClose} />
          )}
        </>
      )}
    </div>
  );
};

export default BannerSetting;
